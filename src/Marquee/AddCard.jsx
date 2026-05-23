import React from 'react';

const AddCard = ({ bgImage, title, description, rating = 4 }) => {
  return (
    <div className="w-80 md:w-96 mx-3 my-4 transition-transform hover:scale-105 duration-300">
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '380px',
          width: '100%',
        }}
      >
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          {/* Logo/Badge */}
          <div className="absolute top-4 right-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
              <img
                className="w-full h-full object-cover"
                alt="Local Market"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            {title || "Fresh & Organic"}
          </h3>
          
          {/* Description */}
          <p className="text-sm md:text-base text-gray-200 mb-3 line-clamp-2">
            {description || "Quality products straight from local farms to your table"}
          </p>
          
          {/* Rating Stars */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-yellow-400 cursor-default"
                  defaultChecked={star <= rating}
                  disabled
                  aria-label={`${star} star`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-300">({rating}.0)</span>
          </div>
          
          {/* Shop Button */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors w-full md:w-auto">
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;

