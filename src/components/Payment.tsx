'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';
import { createPayment } from '@/app/actions';
import { Button } from './ui/button';

type PaymentButtonProps = {
  invoiceId: number;
};

const PaymentButton = ({ invoiceId }: PaymentButtonProps) => {
  const handlePayment = () => {
    createPayment(invoiceId);
  };

  return (
    <Button
      onClick={handlePayment}
      className='flex flex-row gap-3 bg-green-700 w-36 font-bold'
    >
      <CreditCard className='w-5 h-auto' />
      Payment
    </Button>
  );
};

export default PaymentButton;
