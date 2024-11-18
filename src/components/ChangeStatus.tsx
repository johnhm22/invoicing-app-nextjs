'use client';

import React, { useOptimistic } from 'react';
import { ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { AVAILABLE_STATUSES } from '@/data/invoice';
import { updateStatusActionClient } from '@/app/actions';

type ChangeStatusProps = {
  invoiceId: number;
};

const ChangeStatus = ({ invoiceId }: ChangeStatusProps) => {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic<string>('open');

  const handleClick = (invoiceId: number, status: string) => {
    setOptimisticStatus(status);
    // updateStatusActionClient(invoiceId, status);
    updateStatusActionClient(invoiceId, optimisticStatus);
  };

  return (
    <main>
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
    </main>
  );
};

export default ChangeStatus;
