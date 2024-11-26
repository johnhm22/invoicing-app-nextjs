import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import Stripe from 'stripe';

import { Invoices, Customers } from '@/db/schema';
import { db } from '@/db';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';
import Payment from '@/components/Payment';
import { updateStatusActionClient } from '@/app/actions';

type InvoicePageProps = {
  params: Promise<{ invoiceId: string }>;
  searchParams: Promise<{
    status: 'success' | 'cancelled';
    session_id: string;
  }>;
};

export default async function InvoicePage({
  params,
  searchParams,
}: InvoicePageProps) {
  const invoiceId = parseInt((await params).invoiceId);

  const sessionId = (await searchParams).session_id;
  const isSuccess = sessionId && (await searchParams).status === 'success';
  const isCancelled = (await searchParams).status === 'cancelled';
  let isError = isSuccess && !sessionId;

  if (isNaN(invoiceId)) {
    throw new Error('Invalid Invoice ID');
  }

  const stripe = new Stripe(process.env.STRIPE_API_SECRET!);

  if (isSuccess) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status != 'paid') {
      isError === true;
    } else {
      updateStatusActionClient(invoiceId, 'paid');
    }
  } else if (isCancelled) {
    updateStatusActionClient(invoiceId, 'open');
  }

  const [result] = await db
    .select({
      id: Invoices.id,
      status: Invoices.status,
      createTS: Invoices.createTS,
      description: Invoices.description,
      value: Invoices.value,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result,
    customer: {
      name: result.name,
    },
  };

  return (
    <main className='w-full'>
      <Container>
        {isError && (
          <p className='text-sm bg-red-100 px-3 py-2 text-red-800 rounded-lg mb-6 text-center'>
            Something went wrong, please try again
          </p>
        )}
        {isCancelled && (
          <p className='text-sm bg-yellow-100 px-3 py-2 text-yellow-800 rounded-lg mb-6 text-center'>
            Payment process was cancelled, please try again
          </p>
        )}
        <div className='grid grid-cols-2'>
          <div>
            <div className='flex justify-between mb-8'>
              <h1 className='flex items-center gap-4 text-3xl font-bold text-left'>
                Invoice {invoiceId}
                <Badge
                  className={cn(
                    'rounded-full',
                    invoice.status === 'open' && 'bg-blue-500',
                    invoice.status === 'paid' && 'bg-green-500',
                    invoice.status === 'void' && 'bg-zinc-500',
                    invoice.status === 'uncollectable' && 'bg-red-500',
                  )}
                >
                  {invoice.status}
                </Badge>
              </h1>
            </div>
            <p className='text-3xl mb-3'>{(invoice.value / 100).toFixed(2)}</p>
            <p className='text-lg mb-8'>{invoice.description}</p>
          </div>
          <div className=''>
            <div className='font-bold mb-4 text-xl'>Manage Invoice</div>
            {invoice.status === 'open' && <Payment invoiceId={invoiceId} />}
            {invoice.status === 'paid' && (
              <p className='text-xl font-bold flex gap-2 items-center'>
                <Check className='h-auto w-5 rounded-full bg-green-500 text-white p-1' />{' '}
                Invoice Paid
              </p>
            )}
          </div>
        </div>

        <h2 className='font-bold text-lg mb-4'>Billing Details</h2>
        <ul className='grid gap-2'>
          <li className='flex'>
            <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
              Invoice ID
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className='flex'>
            <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
              Invoice Date
            </strong>
            <span>
              {new Date(invoice.createTS).toLocaleDateString('en-GB')}
            </span>
          </li>
          <li className='flex'>
            <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
              Billing Name
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
