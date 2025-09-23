import React, { useEffect, useState } from 'react';
import { Routes, Route,  } from 'react-router-dom';
import Card from './Card';

const Datacard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://local-market-server-self.vercel.app/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {products.slice(0, 11).map(products => (
          <div key={products._id} style={{ margin: '10px', width: '350px', height: '300px' }}>
          <Card products={products} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Datacard;