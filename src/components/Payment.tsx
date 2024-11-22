import React from 'react';
import { CreditCard } from 'lucide-react';

const Payment = () => {
  return (
    <div className='flex flex-row gap-3 bg-green-700 w-36 font-bold rounded-sm justify-center text-white py-2 text-sm'>
      <CreditCard className='w-5 h-auto' />
      Payment
    </div>
  );
};

export default Payment;
