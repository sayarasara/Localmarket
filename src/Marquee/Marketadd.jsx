import React from 'react';
import AddCard from './AddCard';
import Marquee from "react-fast-marquee";

const Marketadd = () => {
  // Advertisement data
  const ads = [
    {
      bgImage: 'https://www.sigonasoffice.com/static/media/uploads/.thumbnails/ripe_red_mangoes_xl_2.jpg/ripe_red_mangoes_xl_2-800x533.jpg',
      title: 'Fresh Mangoes',
      description: 'Sweet & juicy Alphonso mangoes directly from farms. Limited stock!',
      rating: 5
    },
    {
      bgImage: 'https://northernvirginiamag.com/wp-content/uploads/2023/03/farmers_market.jpg',
      title: 'Farmers Market',
      description: 'Visit our local farmers market every Saturday morning!',
      rating: 4
    },
    {
      bgImage: 'https://media.istockphoto.com/id/470981381/photo/fresh-seafood.jpg?s=612x612&w=0&k=20&c=KTg6I9SsAm7UShn0dpWmaVv-MKLi0LgI48CcpftPDYQ=',
      title: 'Fresh Seafood',
      description: 'Catch of the day - premium quality seafood delivered fresh',
      rating: 5
    },
    {
      bgImage: 'https://c8.alamy.com/comp/W3BHF9/local-produce-sign-in-pennsylvania-usa-food-store-W3BHF9.jpg',
      title: 'Local Produce',
      description: 'Support local farmers - 100% organic vegetables & fruits',
      rating: 4
    },
    {
      bgImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREXNiaelE7FzZpcP_8RMnCe8oreVetJEIkseBf1DkK3vPxiAGTObHZbvV0q8fKbGD3_f0&usqp=CAU',
      title: 'Special Offers',
      description: 'Up to 50% off on selected items. Limited time offer!',
      rating: 5
    },
    {
      bgImage: 'https://www.shorelinefruit.com/assets/blog/_800x800_crop_center-center_82_none/cherry-varieties.jpg?mtime=1609862085',
      title: 'Cherry Season',
      description: 'Fresh cherries from Washington - sweet and delicious',
      rating: 5
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Trusted by <span className="text-green-600">Leading Brands</span>
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of fresh products, handpicked from the finest local farms
          </p>
        </div>

        {/* Marquee Slider */}
        <Marquee 
          className="py-4"
          gradient={true}
          gradientColor={[249, 250, 251]}
          speed={40}
          pauseOnHover={true}
          loop={0}
        >
          {ads.map((ad, index) => (
            <AddCard
              key={index}
              bgImage={ad.bgImage}
              title={ad.title}
              description={ad.description}
              rating={ad.rating}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Marketadd;






// import React from 'react'
// import AddCard from './AddCard'
// import Marquee from "react-fast-marquee";

// const Marketadd = () => {
//   return (
//     <div className='bg-slate-300  '>
//         <div className=' max-auto px-5 text-center italic'  >
//              <h2 className="text-4xl text-primary font-bold text-center mb-12">Trusted by Leading Brands</h2>
//         </div>
//   <Marquee className='flex gap-5 h-100'>
// <AddCard bgImage={'https://www.sigonasoffice.com/static/media/uploads/.thumbnails/ripe_red_mangoes_xl_2.jpg/ripe_red_mangoes_xl_2-800x533.jpg'}></AddCard>
// <AddCard bgImage={'https://northernvirginiamag.com/wp-content/uploads/2023/03/farmers_market.jpg'}></AddCard>
// <AddCard bgImage={'https://media.istockphoto.com/id/470981381/photo/fresh-seafood.jpg?s=612x612&w=0&k=20&c=KTg6I9SsAm7UShn0dpWmaVv-MKLi0LgI48CcpftPDYQ='}></AddCard>
// <AddCard bgImage={'https://c8.alamy.com/comp/W3BHF9/local-produce-sign-in-pennsylvania-usa-food-store-W3BHF9.jpg'}></AddCard>
// <AddCard bgImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREXNiaelE7FzZpcP_8RMnCe8oreVetJEIkseBf1DkK3vPxiAGTObHZbvV0q8fKbGD3_f0&usqp=CAU'}></AddCard>
// <AddCard bgImage={'https://www.shorelinefruit.com/assets/blog/_800x800_crop_center-center_82_none/cherry-varieties.jpg?mtime=1609862085'}></AddCard>
//   </Marquee> 
//     </div>
//   )
// }

// export default Marketadd
