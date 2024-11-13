'use client';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/SubmitButton';
import { createAction } from '@/app/actions';
import Form from 'next/form';

import { SyntheticEvent, useState } from 'react';
import Container from '@/components/Container';

const Invoices = () => {
  const [pending, setPending] = useState<boolean>();

  const handleSubmit = async (event: SyntheticEvent) => {
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    await createAction(formData);
    if (pending) {
      event.preventDefault();
      return;
    }
    setPending(true);
  };

  return (
    <main className='gap-6 '>
      <Container>
        <div className='flex justify-between'>
          <h1 className='mb-6 text-3xl font-bold border border-red-500 text-left'>
            Create Invoice
          </h1>
        </div>
        <Form
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
        </Form>
      </Container>
    </main>
  );
};

export default Invoices;
