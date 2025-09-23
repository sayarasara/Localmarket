import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
//import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';



const Paymentpage = () => {
const stripe = useStripe();
const element = useElements();
const {buyId} = useParams();


 const [error, setError] = useState('');



 const { data: buyInfo ={}} = useQuery({
  queryKey : ['buy', buyId],
  queryFn: async () => {
    const res = await useAxiosSecure.get(`/buy/${buyId}`)
    return res.data;
  }
 })
console.log(buyInfo);



const handleSubmite = async (e) => {
    e.preventDefault();
    if (!stripe || !element ) {
return;
    }
const card = element.getElement(CardElement);
if(!card){
  return;
}


const { error, paymentMethod} = await stripe.createPaymentMethod({
  type: 'card',
  card
})
  if (error) {
        setError(error.message);
        }
else {
  setError('');
  console.log('payment method', paymentMethod);
}




}

  return (
    <div>
<form onSubmit={handleSubmite} className='bg-slate p-8 rounded-xl w-full max-w-md max-auto'>
<CardElement>
  </CardElement>
<button type='submit'
className='btn btn-primary text-black w-full'
 disabled ={!stripe}>
pay
</button>
{
  error  && <p>{error}</p>
}
      </form>
    </div>
  )
}

export default Paymentpage
