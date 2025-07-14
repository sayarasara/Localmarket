import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react"

function Card({ products }) {
  if (!products) {
    return <div>No products found.</div>;
  }

  const {  } = products;


  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
    
    className="bg-green-100 " style={{ boxShadow: "0 4px 16px 0 rgba(16, 78, 36, 0.5)" }} >
    <div className="card lg:card-side bg-accent-content shadow-sm">
      <figure>
        <img
          src={}
          alt={}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Category:</strong> {category}</p>
       
        <div className="card-actions justify-end">
              <Link to={`/Group/Detail/${_id}`}> 
            <button>View Detail</button>
          </Link>
        </div>
      </div>
    </div>
    </motion.div>
  );
}

export default Card;