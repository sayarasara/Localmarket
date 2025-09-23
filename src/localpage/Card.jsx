import React from "react";
import { Link } from "react-router-dom";
//import { motion } from "framer-motion";

function Card({ products }) {
  if (!products) {
    return <div>No products found.</div>;
  }

  const {  product_image,product_name, market_name,date, _id} = products;


  return (
    <div 
    
    className="bg-slate-100 " style={{ boxShadow: "0 4px 16px 0 rgba(230, 240, 240, 0.5)" }} >
    <div className="card lg:card-side bg-slate-100 shadow-sm">
      <figure>
        <img
          src={product_image}
          alt={product_name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product_name}</h2>
        <p><strong>marketname:</strong> {market_name}</p>
        <p><strong>date:</strong> {date}</p>
       
        <div className="card-actions justify-end">
        <button className="btn bg-slate-400">
           <Link to={`/Datacard/detail/${_id}`}>View Details</Link>
        </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Card;