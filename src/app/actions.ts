'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { Customers, Invoices, Status } from '@/db/schema';
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
  const { userId, redirectToSignIn, orgId } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
  const description = formData.get('description') as string;

  const [customer] = await db
    .insert(Customers)
    .values({
      name,
      email,
      userId,
      organisationId: orgId || null,
    })
    .returning({ id: Customers.id });

  const result = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      customerId: customer.id,
      status: 'open',
      organisationId: orgId || null,
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

  await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)));

  revalidatePath(`/invoices/${invoiceId}`, 'page');
};

export const deleteInvoiceAction = async (invoiceId: number) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  await db
    .delete(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)));

  redirect(`/dashboard`);
};
