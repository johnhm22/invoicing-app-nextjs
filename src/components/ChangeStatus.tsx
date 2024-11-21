'use client';

import React, { useRef } from 'react';
import { ChevronDown, Ellipsis, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { AVAILABLE_STATUSES } from '@/data/invoice';
import { updateStatusActionClient, deleteInvoiceAction } from '@/app/actions';

type ChangeStatusProps = {
  invoiceId: number;
};

const ChangeStatus = ({ invoiceId }: ChangeStatusProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleClick = (invoiceId: number, status: string) => {
    updateStatusActionClient(invoiceId, status);
  };

  const handleConfirmDeleteInvoice = () => {
    console.log('deleteInvoice clicked');
    deleteInvoiceAction(invoiceId);
  };

  const handleClose = () => {
    console.log('handleClose called');
    dialogRef.current!.close();
  };

  return (
    <main className='flex gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            Change Status
            <ChevronDown className='h-full w-40' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {AVAILABLE_STATUSES.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => handleClick(invoiceId, status.id)}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <span className='sr-only'>More options</span>
            <Ellipsis className='w-4 h-auto' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button
              className='flex gap-2 items-center'
              onClick={() => {
                dialogRef.current?.showModal();
              }}
            >
              <Trash2 className='w-4 h-auto' />
              Delete Invoice
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <dialog ref={dialogRef} className='h-1/4 w-1/3 bg-stone-100 p-4'>
        <h3 className='text-xl font-semibold flex justify-center'>
          Are you absolutely sure?
        </h3>
        <p className='mt-4'>
          This action cannot be undone. This will permanently delete this
          invoice and remove it from the servers.
        </p>
        <span className='mt-5 flex flex-row gap-4 justify-end'>
          <Button
            className='bg-blue-400'
            variant='secondary'
            size='sm'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            size='sm'
            onClick={handleConfirmDeleteInvoice}
          >
            Delete Invoice
          </Button>
        </span>
      </dialog>
      {/* <dialog
        ref={dialogRef}
        className='w-2/3 rounded-lg bg-stone-100 shadow-sm md:w-1/2 lg:w-2/5 flex flex-col p-6 mt-8'
      >
        <h3 className='text-xl border border-blue-500 flex justify-center'>
          Are you absolutely sure?
        </h3>
        <p className='flex border border-cyan-500 mt-4'>
          This action cannot be undone. This will permanently delete this
          invoice and remove it from the servers.
        </p>
        <span className='mt-5 flex flex-row gap-4 border border-red-500 justify-end'>
          <Button variant='secondary' size='sm' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            size='sm'
            onClick={handleConfirmDeleteInvoice}
          >
            Delete Invoice
          </Button>
        </span>
      </dialog> */}
    </main>
  );
};

export default ChangeStatus;
