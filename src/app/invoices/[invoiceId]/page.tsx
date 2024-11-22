import { eq, and, isNull } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { Invoices, Customers } from '@/db/schema';
import { db } from '@/db';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';
import ChangeStatus from '@/components/ChangeStatus';

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { userId, orgId } = await auth();

  const invoiceId = parseInt((await params).invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error('Invalid Invoice ID');
  }

  if (!userId) return;

  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          eq(Invoices.organisationId, orgId),
        ),
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organisationId),
        ),
      )
      .limit(1);
  }

  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers,
  };

  return (
    <main className='w-full border border-red-500'>
      <Container>
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
          <ChangeStatus invoiceId={invoiceId} />
        </div>
        <p className='text-3xl mb-3'>{(invoice.value / 100).toFixed(2)}</p>
        <p className='text-lg mb-8'>{invoice.description}</p>
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
          <li className='flex'>
            <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
              Billing Email
            </strong>
            <span>{invoice.customer.email}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
