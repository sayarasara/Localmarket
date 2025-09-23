import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import Paymentpage from './Paymentpage'


const stripePromise = loadStripe('pk_test_51S6HVIGkFEdkXy8p3qsz4dQcdBss4Fisuy9125LIsF5jCtoaAEyduXJ8XnXgu3tOwJP8NBWbLKVzYQpGVp0F6a4O00ygQ3LIbB');
const Payment = () => {
  return (
<Elements stripe={stripePromise}>
<Paymentpage />
</Elements>
  )
}

export default Payment
