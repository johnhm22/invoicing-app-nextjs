import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { Invoices } from '@/db/schema';
import { db } from '@/db';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  // const invoiceData = await db.select().from(Invoices);

  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error('Invalid Invoice ID');
  }

  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  // console.log('invoiceDetails: ', invoice);

  if (!invoice) {
    notFound();
  }

  return (
    <main className='max-w-5xl my-12 mx-auto'>
      <div className='flex justify-between mb-8'>
        <h1 className='flex items-center gap-4  text-3xl font-bold text-left'>
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
          <span>{new Date(invoice.createTS).toLocaleDateString('en-GB')}</span>
        </li>
        <li className='flex'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Name
          </strong>
          <span></span>
        </li>
        <li className='flex'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Email
          </strong>
          <span></span>
        </li>
      </ul>
    </main>
  );
}
