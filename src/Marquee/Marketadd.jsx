import React from 'react'
import AddCard from './AddCard'
import Marquee from "react-fast-marquee";

const Marketadd = () => {
  return (
    <div className='bg-slate-300'>
        <div className=' max-auto px-5 text-center'  >
             <h2 className="text-2xl text-primary font-bold text-center mb-12">Trusted by Leading Brands</h2>
        </div>
  <Marquee className='flex gap-5'>
<AddCard bgImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rBQ_OSOKSA0Ziys-0sS2QuL987CFERWcEg&s'}></AddCard>
<AddCard bgImage={'https://cdn.dribbble.com/userupload/5618357/file/original-12b2e211b10ed1293b2fbd71a6fb83d8.jpg?resize=1600x1200'}></AddCard>
<AddCard bgImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgreXB1LrC6R4NrGpaGXbQ_taMsQlUe5RPQ&s'}></AddCard>
<AddCard bgImage={'https://c8.alamy.com/comp/W3BHF9/local-produce-sign-in-pennsylvania-usa-food-store-W3BHF9.jpg'}></AddCard>
<AddCard bgImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9T7HMSXR10aFBJH_GzO8FNN_ROGttkryavQ&s'}></AddCard>
<AddCard bgImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVpqa0WF7nugUjqt-UA0kRPVuUiLchWn2URsJ5LFWVevGcHEhWfZF918KZYv5CRgDXOI&usqp=CAU'}></AddCard>
  </Marquee> 
    </div>
  )
}

export default Marketadd
