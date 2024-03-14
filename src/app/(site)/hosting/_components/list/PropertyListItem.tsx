import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import PropertyListItemStatusBadge from '@/app/(site)/hosting/_components/list/PropertyListItemBadge';
import PropertyManagerMenu from '@/app/(site)/hosting/_components/property-manager/PropertyManagerMenu';

type Props = {
  className?: string;
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  status: 'draft' | 'pending' | 'approved';
};

function PropertyListItem({
  className,
  id,
  title,
  description,
  coverImageUrl,
  status,
}: Props) {
  return (
    <section
      className={cn(
        className,
        `flex w-full flex-col space-y-3 rounded-3xl border border-gray-300 px-6 py-4
          shadow-lg`
      )}
    >
      <div
        className="relative h-32 w-full rounded-xl object-cover transition hover:brightness-75
          hover:filter"
      >
        <Image
          fill={true}
          src={coverImageUrl}
          alt={''}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="font-extrabold">
          <PropertyManagerMenu id={id} />
        </div>
      </div>
      <ul className="flex space-x-2">
        <PropertyListItemStatusBadge status={status} />
      </ul>
      <div className="font-light text-gray-600">{description}</div>
      <button className="rounded-2xl bg-gray-800 py-1 text-white">
        Edit Listing
      </button>
    </section>
  );
}

export default PropertyListItem;
