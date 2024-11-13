import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Container from '@/components/Container';
import { Invoices } from '@/db/schema';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { cn } from '@/lib/utils';

export default async function Dashboard() {
  const invoiceData = await db.select().from(Invoices);

  return (
    <main className='h-full border border-red-500'>
      <Container>
        <div className='flex justify-between'>
          <h1 className='mb-6 text-3xl font-bold border border-red-500 text-left'>
            Invoices
          </h1>
          <p>
            <Button variant='ghost' className='inline-flex gap-2' asChild>
              <Link href='/invoices/new'>
                <CirclePlus className='h-4 w-4' />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px] p-4'>Date</TableHead>
              <TableHead className='p-4'>Customer</TableHead>
              <TableHead className='p-4'>Email</TableHead>
              <TableHead className='text-center p-4'>Status</TableHead>
              <TableHead className='text-right p-4'>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceData.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className='font-medium text-left p-0'>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className='font-semibold p-4 block bg-blue-300'
                  >
                    {new Date(invoice.createTS).toLocaleDateString('en-GB')}
                  </Link>
                </TableCell>
                <TableCell className='text-left p-0'>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className='font-semibold p-4 block bg-amber-300'
                  >
                    D Trump
                  </Link>
                </TableCell>
                <TableCell className='text-left p-0'>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className='p-4 block bg-red-300'
                  >
                    dtrump@gmail.com
                  </Link>
                </TableCell>
                <TableCell className='text-center p-0'>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className='font-semibold p-4 block'
                  >
                    <Badge
                      className={cn(
                        'rounded-full',
                        'capitalize',
                        invoice.status === 'open' && 'bg-blue-500',
                        invoice.status === 'paid' && 'bg-green-500',
                        invoice.status === 'void' && 'bg-zinc-500',
                        invoice.status === 'uncollectable' && 'bg-red-500',
                      )}
                    >
                      {invoice.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className='text-right p-0'>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className='font-semibold p-4 block'
                  >
                    {(invoice.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
