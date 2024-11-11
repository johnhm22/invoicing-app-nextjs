'use server';

import { redirect } from 'next/navigation';

import { Invoices } from '@/db/schema';
import { db } from '@/db';

export const createAction = async (formData: FormData) => {
  //   console.log('formData: ', formData);

  const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
  const description = formData.get('description') as string;
  console.log('value', value);
  const result = await db
    .insert(Invoices)
    .values({
      value,
      description,
      status: 'open',
    })
    .returning({ id: Invoices.id });

  result[0].id;
  redirect(`/invoices/${result[0].id}`);
};
