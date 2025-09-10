import React from "react";
import { Link } from "react-router-dom";
//import { motion } from "motion/react"

function Card({ products }) {
  if (!products) {
    return <div>No products found.</div>;
  }

  const {  product_image,product_name, market_name,date, _id} = products;


  return (
    <div 
      whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
    
    className="bg-slate-100 " style={{ boxShadow: "0 4px 16px 0 rgba(71, 130, 134, 0.5)" }} >
    <div className="card lg:card-side bg-accent-content shadow-sm">
      <figure>
        <img
          src={product_image}
        //  alt={}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product_name}</h2>
        <p><strong>marketname:</strong> {market_name}</p>
        <p><strong>date:</strong> {date}</p>
       
        <div className="card-actions justify-end">
          <Link to={`/Datacard/detail/${_id}`}>View Details</Link>
        
        </div>
      </div>
    </div>
    </div>
  );
}

export default Card;