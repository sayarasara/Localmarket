import React from 'react'
import AddCard from './AddCard'
import Marquee from "react-fast-marquee";

const Marketadd = () => {
  return (
    <div className='bg-slate-300'>
        <div className=' max-auto px-5 text-center italic'  >
             <h2 className="text-4xl text-primary font-bold text-center mb-12">Trusted by Leading Brands</h2>
        </div>
  <Marquee className='flex gap-5'>
<AddCard bgImage={'https://www.sigonasoffice.com/static/media/uploads/.thumbnails/ripe_red_mangoes_xl_2.jpg/ripe_red_mangoes_xl_2-800x533.jpg'}></AddCard>
<AddCard bgImage={'https://northernvirginiamag.com/wp-content/uploads/2023/03/farmers_market.jpg'}></AddCard>
<AddCard bgImage={'https://media.istockphoto.com/id/470981381/photo/fresh-seafood.jpg?s=612x612&w=0&k=20&c=KTg6I9SsAm7UShn0dpWmaVv-MKLi0LgI48CcpftPDYQ='}></AddCard>
<AddCard bgImage={'https://c8.alamy.com/comp/W3BHF9/local-produce-sign-in-pennsylvania-usa-food-store-W3BHF9.jpg'}></AddCard>
<AddCard bgImage={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREXNiaelE7FzZpcP_8RMnCe8oreVetJEIkseBf1DkK3vPxiAGTObHZbvV0q8fKbGD3_f0&usqp=CAU'}></AddCard>
<AddCard bgImage={'https://www.shorelinefruit.com/assets/blog/_800x800_crop_center-center_82_none/cherry-varieties.jpg?mtime=1609862085'}></AddCard>
  </Marquee> 
    </div>
  )
}

export default Marketadd
