'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';

import { Customers, Invoices, Status } from '@/db/schema';
import { db } from '@/db';
import { and, eq, isNull } from 'drizzle-orm';
import { InvoiceCreatedEmail } from '@/emails/invoice-created';

// const checkUserExists = async () => {
//   const { userId, redirectToSignIn } = await auth();
//   if (!userId) {
//     return redirectToSignIn();
//   } else {
//     return userId;
//   }
// };

const stripe = new Stripe(process.env.STRIPE_API_SECRET as string);
const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { data, error } = await resend.emails.send({
    from: 'John <onboarding@resend.dev>',
    to: 'johnhmorgan@outlook.com',
    subject: 'Here is your new invoice',
    react: InvoiceCreatedEmail({ invoiceId: result[0].id }),
  });

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
  const { userId, redirectToSignIn, orgId } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  if (orgId) {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          eq(Invoices.organisationId, orgId),
        ),
      );
  } else {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organisationId),
        ),
      );
  }
  revalidatePath(`/invoices/${invoiceId}`, 'page');
};

export const deleteInvoiceAction = async (invoiceId: number) => {
  const { userId, redirectToSignIn, orgId } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  if (orgId) {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          eq(Invoices.organisationId, orgId),
        ),
      );
  } else {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organisationId),
        ),
      );
  }
  redirect(`/dashboard`);
};

export const createPayment = async (invoiceId: number) => {
  const headersList = await headers();
  const origin = headersList.get('origin');

  const [result] = await db
    .select({ status: Invoices.status, value: Invoices.value })
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId));

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'gbp',
          product: 'prod_RHZI5lUs4tRFlY',
          unit_amount: result.value,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/invoices/${invoiceId}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/invoices/${invoiceId}/payment?status=cancelled&session_id={CHECKOUT_SESSION_ID}`,
  });

  if (!session.url) {
    throw new Error('Invalid payment session');
  }
  redirect(session.url);
};
function EmailTemplate(arg0: { firstName: string }) {
  throw new Error('Function not implemented.');
}
