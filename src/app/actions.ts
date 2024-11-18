'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { Invoices, Status } from '@/db/schema';
import { db } from '@/db';
import { and, eq } from 'drizzle-orm';

// const checkUserExists = async () => {
//   const { userId, redirectToSignIn } = await auth();
//   if (!userId) {
//     return redirectToSignIn();
//   } else {
//     return userId;
//   }
// };

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

type InvoiceTypes = 'void' | 'open' | 'paid' | 'uncollectable';

export const updateStatusAction = async (formData: FormData) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const invoiceId = formData.get('id') as string;
  const status = formData.get('status') as Status;

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(
      and(eq(Invoices.id, parseInt(invoiceId)), eq(Invoices.userId, userId)),
    );

  revalidatePath(`/invoices/${invoiceId}`, 'page');
};

export const updateStatusActionClient = async (
  invoiceId: number,
  status: string,
) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const results = await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)));

  revalidatePath(`/invoices/${invoiceId}`, 'page');
};
