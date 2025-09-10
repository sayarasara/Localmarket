import React, { useEffect, useState } from 'react'
import useAuth from '../Hooks/useAuth'
import { toast } from 'react-toastify'

const Mymodal = (product,fetchproduct) => {

    const { user } = useAuth()
  console.log(user)
  const { name, market_name, price, _id, vendor, image ,quantity} = product || {}
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  const [orderData, setOrderData] = useState({
    vendor,
    productId: _id,
    quantity: 10,
    price: price,
    product_name: name,
    market_name: market_name,
    product_image: image,
  })

  useEffect(() => {
    if (user)
      setOrderData(prev => {
        return {
          ...prev,
          customer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        }
      })
  }, [user])

  const handleQuantity = value => {
    const totalQuantity = parseInt(value)
    if (totalQuantity > quantity)
      return toast.error('You cannot purchase more.')
    const calculatedPrice = totalQuantity * price
    setSelectedQuantity(totalQuantity)
    setTotalPrice(calculatedPrice)

    setOrderData(prev => {
      return {
        ...prev,
        price: calculatedPrice,
        quantity: totalQuantity,
      }
    })
  }

  return (
    <div>
      {/* The button to open modal */}
<a href="#my_modal_8" className="btn">Buy Now</a>

{/* Put this part before </body> tag */}
<div className="modal" role="dialog" id="my_modal_8">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Hello!</h3>
    <p className="py-4">This modal works with anchor links</p>
    <div className="modal-action">
      <a href="#" className="btn">Yay!</a>
    </div>
    <div className='mt-2'>
              <p className='text-sm text-gray-500'>product: {name}</p>
            </div>
            <div className='mt-2'>
 <p className='text-sm text-gray-500'>market: {market_name}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Customer: {user?.displayName}
              </p>
            </div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Price Per Unit: $ {price}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Available Quantity: {quantity}
              </p>
            </div>
            <hr className='mt-2' />
            <p>Order Info:</p>
            <div className='mt-2'>
              <input
                value={selectedQuantity}
                onChange={e => handleQuantity(e.target.value)}
                type='number'
                min={1}
                className='border px-3 py-1'
              />
            </div>
             <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Selected Quantity: {selectedQuantity}
              </p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Total Price: {totalPrice}</p>
            </div>
            
              <CheckoutForm
                totalPrice={totalPrice}
                orderData={orderData}
                fetchproduct={fetchproduct}
              />
          
  </div>
</div>
    </div>
  )
}

export default Mymodal
