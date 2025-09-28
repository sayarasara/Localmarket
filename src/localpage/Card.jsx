import React from "react";
import { Link } from "react-router-dom";

function Card({ products }) {
  if (!products) {
    return <div className="text-center p-4 text-gray-500">No products found.</div>;
  }

  const { product_image, product_name, market_name, date, price, _id } = products;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full h-full flex flex-col">
      
      {/* Image Container */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={product_image}
          alt={product_name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product_name}
        </h3>
        
        <div className="space-y-2 mb-4 flex-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Market:</span> {market_name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {date}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Price:</span> ${price}
          </p>
        </div>
        
        <div className="mt-auto">
          <Link 
            to={`/Datacard/detail/${_id}`}
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded transition-colors duration-200 font-medium no-underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;