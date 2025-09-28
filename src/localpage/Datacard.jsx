import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Card from './Card';

const Datacard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter and sort states
  const [selectedDate, setSelectedDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Show 6 products per page

  useEffect(() => {
    fetch('https://local-market-server-self.vercel.app/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply date filter
    if (selectedDate) {
      result = result.filter(product => product.date === selectedDate);
    }

    // Apply date range filter
    if (startDate && endDate) {
      result = result.filter(product => {
        const productDate = new Date(product.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return productDate >= start && productDate <= end;
      });
    }

    // Apply sorting
    if (sortOrder === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedDate, startDate, endDate, sortOrder]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setSelectedDate('');
    setStartDate('');
    setEndDate('');
    setSortOrder('');
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No Products found.</div>;

  return (
    <div style={{
      backgroundColor: '#d3e6f1e4',
      minHeight: '100vh', 
      padding: '30px 0'
    }}>
      <h1 style={{
        textAlign: 'center',
        padding: '30px 0 10px 0',
        color: '#220996ff',
        fontSize: '40px'
      }}>
        All Products
      </h1>

      {/* Filters and Sorting Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 20px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Single Date Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Filter by Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setStartDate('');
                setEndDate('');
              }}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px'
              }}
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Date Range:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setSelectedDate('');
                }}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
                placeholder="Start Date"
              />
              <span style={{ lineHeight: '35px' }}>to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setSelectedDate('');
                }}
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
                placeholder="End Date"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Sort by Price:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                minWidth: '150px'
              }}
            >
              <option value="">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div style={{ alignSelf: 'end' }}>
            <button
              onClick={clearFilters}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div style={{
          textAlign: 'center',
          marginTop: '15px',
          fontWeight: 'bold',
          color: '#220996ff'
        }}>
          Showing {filteredProducts.length} of {products.length} products
          {filteredProducts.length > 0 && (
            <span style={{ marginLeft: '10px', color: '#666', fontSize: '14px' }}>
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {currentProducts.map(product => (
          <div key={product._id} style={{ margin: '10px', width: '350px', height: '300px' }}>
            <Card products={product} />
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666',
            fontSize: '18px'
          }}>
            No products match your filters. Try adjusting your criteria.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredProducts.length > productsPerPage && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === 1 ? '#ccc' : '#220996ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              margin: '0 5px'
            }}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              style={{
                padding: '8px 12px',
                backgroundColor: currentPage === number ? '#220996ff' : 'white',
                color: currentPage === number ? 'white' : '#220996ff',
                border: `1px solid #220996ff`,
                borderRadius: '5px',
                cursor: 'pointer',
                margin: '0 2px',
                minWidth: '40px'
              }}
            >
              {number}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 16px',
              backgroundColor: currentPage === totalPages ? '#ccc' : '#220996ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              margin: '0 5px'
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Products Per Page Info */}
      {filteredProducts.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '15px',
          color: '#666',
          fontSize: '14px'
        }}>
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </div>
      )}
    </div>
  );
};

export default Datacard;