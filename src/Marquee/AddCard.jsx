import React from 'react'

const AddCard = ({ bgImage }) => {
  return (
    <div>
      <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      `url(${bgImage})`,
       width: '700px', // adjust the width to your liking
        height: '200px',
            margin: '4px',
        padding: '4px',
        borderRadius: '10px',
          filter: 'brightness(2)'
  }}
>
  <div className="hero-overlay "></div>
  <div className="hero-content text-left">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl italic font-bold">Here Everything Whatever you want!</h1>
   <div className="w-20 rounded-full">
          <img  className='rounded-full '
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s
            "/>
            </div>
            <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default AddCard
