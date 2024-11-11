'use client';

import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';
import Form from 'next/form';

import { Button } from '@/components/ui/button';

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log('pending: ', pending);

  return (
    <Button className='relative w-full font-semibold'>
      <span className={pending ? 'text-transparent' : ''}>Submit</span>
      {pending && (
        <span className='absolute flex items-center justify-center w-full h-full text-gray-400'>
          <LoaderCircle className='animate-spin' />{' '}
        </span>
      )}
    </Button>
  );
};
