import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FormEvent } from 'react';
import PropertyListItemStatusBadge from '@/components/host/list/PropertyListItemBadge';
import PropertyManagerMenu from '@/components/host/property-manager/PropertyManagerMenu';
import PropertyUpdateButton from '@/components/host/list/PropertyUpdateButton';
import { RentPeriods } from '@/lib/cimi/types/listingData.types';

type Props = {
  className?: string;
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  status: 'draft' | 'pending' | 'approved';
  rentPeriods: RentPeriods[];
};

function PropertyListItem({
  className,
  id,
  title,
  description,
  coverImageUrl,
  status,
  rentPeriods,
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
        {coverImageUrl ? (
          <Image
            fill={true}
            src={coverImageUrl}
            alt={''}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div
            className={
              'flex h-full items-center justify-center rounded border border-gray-300'
            }
          >
            No property images yet...
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="font-extrabold">
          <PropertyManagerMenu
            id={id}
            status={status}
            rentPeriods={rentPeriods}
          />
        </div>
      </div>
      <ul className="flex space-x-2">
        <PropertyListItemStatusBadge status={status} />
      </ul>
      <div className="font-light text-gray-600">{description}</div>
      <PropertyUpdateButton id={id} />
    </section>
  );
}

export default PropertyListItem;
