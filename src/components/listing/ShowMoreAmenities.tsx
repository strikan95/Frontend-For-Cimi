'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Amenities } from '@/lib/cimi/types/listingData.types';
import InlineSVG from 'react-inlinesvg';
import { ScrollArea } from '@/components/ui/scroll-area';

function ShowMoreAmenities({ amenities }: { amenities: Amenities[] }) {
  const [searchDrawerState, setSearchDrawerState] = useState(false);

  return (
    <Dialog.Root open={searchDrawerState} onOpenChange={setSearchDrawerState}>
      <Dialog.Trigger asChild>
        <div className={'w-full'}>
          <Button
            variant={'outline'}
            className={'border-2 border-black bg-[#EAEAEA]'}
          >
            Show more
          </Button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 z-30 bg-black/80 data-[state=open]:animate-in
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0`}
        />
        <Dialog.Content
          className="fixed left-0 top-0 z-40 h-full w-full bg-gray-100 p-2 md:left-[50%] md:top-[50%]
            md:aspect-square md:h-fit md:max-h-fit md:max-w-lg md:translate-x-[-50%]
            md:translate-y-[-50%] md:rounded-lg md:pb-16"
        >
          <div className={'flex flex-col'}>
            <div
              className={'flex w-full justify-between space-y-1.5 px-6 pt-6'}
            >
              <h1 className={'text-xl font-bold'}>Amenities</h1>
              <Dialog.Close>
                <X>Close</X>
              </Dialog.Close>
            </div>

            <div
              className={
                'flex h-full flex-col items-center space-y-6 bg-gray-100 p-6'
              }
            >
              <ScrollArea className="h-96">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={'flex h-16 w-full flex-nowrap items-center'}
                  >
                    <InlineSVG
                      style={{ width: '2rem', height: 'auto' }}
                      src={amenity.iconUrl}
                    />
                    <span className={'pl-4 text-lg text-gray-900'}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ShowMoreAmenities;
