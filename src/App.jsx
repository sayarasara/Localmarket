// App.jsx - NO Navbar here (it's already in Rootlayout)
import React from 'react';
import { Message } from './Authentication/Message';

function App() {
  return (
    <div className="font-sans">
      <Message />
      {/* Hero Section with Parallax Effect - pt-16 for navbar spacing */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center pt-16"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">Welcome to Our Local Market</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">Fresh, organic & affordable produce straight from local farms to your table.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-xl">Explore Products</button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition">Our Story</button> */}
          </div>
        </div>
       </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose <span className="text-green-600">Local Market?</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We bring the best of nature to your doorstep with unmatched quality and service.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🥬", title: "100% Organic", desc: "Certified organic produce grown without harmful pesticides." },
              { icon: "💰", title: "Best Prices", desc: "Direct from farmers, no middlemen — saving you money." },
              { icon: "🚚", title: "Free Delivery", desc: "Free same-day delivery on orders over $50." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Story Section with Improved Layout */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-auto object-cover transform transition duration-700 hover:scale-105"
                  src="https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Fresh vegetables at market"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-green-100 rounded-full -z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-100 rounded-full -z-0"></div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">Isn't it a part of <span className="text-green-600">life!</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A market is more than a place to buy and sell — it's the heartbeat of the community. 
                We connect local farmers directly with you, ensuring the freshest produce reaches your table 
                while supporting sustainable agriculture. Our mission is to make healthy, organic food accessible 
                to everyone at fair prices.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <img
                  className="w-16 h-16 rounded-full object-cover border-4 border-green-200"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Farmer"
                />
                <div>
                  <p className="font-semibold">— Maria Gonzales, Founder</p>
                  <p className="text-sm text-gray-500">3rd generation farmer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="mb-12 opacity-90">Join thousands of happy shoppers who trust Local Market daily.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "The freshest vegetables I've ever bought online! Delivery is always on time.", name: "Sarah Johnson", role: "Home Cook" },
              { quote: "Amazing prices and quality. I've been buying here for 2 years now.", name: "David Lee", role: "Restaurant Owner" },
              { quote: "Love that they support local farmers. The organic section is incredible!", name: "Emma Watson", role: "Nutritionist" }
            ].map((t, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <p className="italic mb-4">"{t.quote}"</p>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm opacity-80">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(3px); }
        }
      `}</style>
    </div>
  );
}

export default App;













// function App() {
//   return (
//     <>
//       <div
//         className="hero min-h-screen "
//         style={{
//           backgroundImage:
//             "url(https://www.shutterstock.com/image-vector/street-market-vegetable-fruits-shop-260nw-1568782315.jpg)",
//         }}
//       >
//         <div className="hero-overlay ">
//           <h1 className="text-3xl font-bold">Welcome to Our Local Market</h1>{" "}
//         </div>
//         <div className="hero-content text-neutral-content text-left">
//           <div className="max-w-md">
//             <div className=" flex flex-row ">
//               <div>
//                 <img
//                   className="mask  mask-triangle-3 p-4"
//                   src="https://img.freepik.com/premium-photo/photo-fresh-carrot-vegetable-with-leaves_763111-25937.jpg"
//                 />
//                 <img
//                   className="mask mask-triangle-4 p-4"
//                   src="https://5.imimg.com/data5/SELLER/Default/2024/11/468104868/HZ/HO/AN/2685718/a-250x250.jpg"
//                 />
//               </div>
//             </div>
//             <p className="mb-5 bg-slate-100 text-2xl italic">
//               We offer our customers essential goods with the lowest possible
//               prices, which we receive thanks to direct cooperation with
//               manufacturers, a strict cost control policy and a minimum trade
//               surcharge. So, we give you the best service at the lowest prices.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <div className="flex w-full flex-col lg:flex-row italic ">
//           <div className="hero bg-slate-300 min-h-screen">
//             <div className="hero-content flex-col lg:flex-row-reverse">
//               <div>
//                 <h1 className="text-5xl font-bold">
//                   Isn't it is a part of life!
//                 </h1>
//                 <p className="py-6 text-xl">
//                   market, a means by which the exchange of goods and services
//                   takes place as a result of buyers and sellers being in contact
//                   with one another, either directly or through mediating agents
//                   or institutions. Markets in the most literal and immediate
//                   sense are places in which things are bought and sold.
//                 </p>
//                 <div className="w-30 rounded-full">
//                   <img
//                     className="rounded-full"
//                     alt=""
//                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s
//                      "
//                   />
//                 </div>
//               </div>
//             </div>
            
//           </div>
//           <div className="hero bg-slate-300 min-h-screen ">
//             <div className="hero-content flex-col lg:flex-row-reverse">
//               <img
//                 className="rounded"
//                 src="https://cdnlylm.nabma.com/wp-content/uploads/2025/03/LYLM-2025-5-16_9-Landscape.jpeg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
