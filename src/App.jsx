

function App() {


  return (
    <>
    <div
  className="hero min-h-screen "
  style={{
    backgroundImage:
      "url(https://www.shutterstock.com/image-vector/street-market-vegetable-fruits-shop-260nw-1568782315.jpg)",
    
  }}
>
  <div className="hero-overlay ">Local Market</div>
  <h1 class="italic text-white font-bold text-3xl">...Welcome ...</h1>
  <div className="hero-content text-neutral-content text-left">
    <div className="max-w-md">
<div className=" flex flex-row ">
<div>
  <img
  className="mask mask-triangle-3"
  src="https://img.freepik.com/premium-photo/photo-fresh-carrot-vegetable-with-leaves_763111-25937.jpg" />
  <img
  className="mask mask-triangle-4"
  src="https://5.imimg.com/data5/SELLER/Default/2024/11/468104868/HZ/HO/AN/2685718/a-250x250.jpg" />
</div>
</div>
      <p className="mb-5 text-2xl italic">
   We offer our customers essential goods with the lowest possible prices, which we receive thanks to direct cooperation with manufacturers, a strict cost control policy and a minimum trade surcharge.
      </p>
  
    </div>
  </div>
</div>


<div className="flex w-full flex-col lg:flex-row italic">
<div className="hero bg-slate-300 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div>
      <h1 className="text-5xl font-bold">Isn't it is a part of life!</h1>
      <p className="py-9 text-xl">
market, a means by which the exchange of goods and services takes place as a result of buyers and sellers being in contact with one another, either directly or through mediating agents or institutions.

Markets in the most literal and immediate sense are places in which things are bought and sold.
      </p>
        <div className="w-30 rounded-full">
          <img  className='rounded-full'
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s
            "/>
            </div>
    </div>
  </div>
</div>
<div className="hero bg-slate-300 min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
<img
  className="mask mask-heart"
  src="https://cdnlylm.nabma.com/wp-content/uploads/2025/03/LYLM-2025-5-16_9-Landscape.jpeg" />
    <div>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default App
