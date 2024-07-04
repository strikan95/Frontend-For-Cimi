import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  status: 'draft' | 'pending' | 'approved';
};

function PropertyListItemStatusBadge({ status }: Props) {
  const color = {
    draft: 'bg-gray-400',
    pending: 'bg-yellow-400',
    approved: 'bg-green-400',
  }[status];

  return (
    <li
      className={cn('text-md rounded-3xl bg-green-400 px-4 text-white', color)}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </li>
  );
}

export default PropertyListItemStatusBadge;
