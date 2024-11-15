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
  const [state, setState] = useState<string>('ready');

  const handleSubmit = async (event: SyntheticEvent) => {
    if (state === 'pending') {
      event.preventDefault();
      return;
    }
    setState('pending');
  };

  return (
    <main className='gap-6 '>
      <Container>
        <div className='flex justify-between'>
          <h1 className='mb-6 text-3xl font-bold text-left'>Create Invoice</h1>
        </div>
        <Form
          action={createAction}
          onSubmit={handleSubmit}
          className='grid gap-4 max-w-xs'
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
