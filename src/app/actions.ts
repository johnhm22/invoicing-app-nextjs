'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { Invoices } from '@/db/schema';
import { db } from '@/db';

export const createAction = async (formData: FormData) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
  const description = formData.get('description') as string;

  const result = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      status: 'open',
    })
    .returning({ id: Invoices.id });

  result[0].id;
  redirect(`/invoices/${result[0].id}`);
};
