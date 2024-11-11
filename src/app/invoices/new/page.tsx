'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/SubmitButton';
import { createAction } from '@/app/actions';

import { SyntheticEvent, useState } from 'react';

const Invoices = () => {
  const [pending, setPending] = useState<boolean>();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    await createAction(formData);
    if (pending) return;
    setPending(true);
  };

  return (
    <main className='flex flex-col justify-center gap-6 max-w-5xl my-12 mx-auto border border-red-500'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold border border-red-500 text-left'>
          Create Invoice
        </h1>
      </div>
      <form
        action={createAction}
        onSubmit={handleSubmit}
        className='grid gap-4 max-w-xs border border-blue-500'
      >
        <div>
          <Label htmlFor='name' className='block mb-2 font-semibold text-sm'>
            Billing Name
          </Label>
          <Input id='name' name='name' type='text' />
        </div>
        <div>
          <Label htmlFor='email' className='block mb-2 font-semibold text-sm'>
            Billing Email
          </Label>
          <Input id='email' name='email' type='email' />
        </div>
        <div>
          <Label htmlFor='value' className='block mb-2 font-semibold text-sm'>
            Value
          </Label>
          <Input id='value' name='value' type='text' />
        </div>
        <div>
          <Label
            htmlFor='description'
            className='block mb-2 font-semibold text-sm'
          >
            Description
          </Label>
          <Textarea id='description' name='description' />
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </main>
  );
};

export default Invoices;
