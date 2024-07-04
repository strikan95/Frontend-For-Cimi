'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

function ShowMoreDescription({ description }: { description: string }) {
  const [searchDrawerState, setSearchDrawerState] = useState(false);

  return (
    <Dialog.Root open={searchDrawerState} onOpenChange={setSearchDrawerState}>
      <Dialog.Trigger asChild>
        <Button
          variant={'outline'}
          className={'border-2 border-black bg-[#EAEAEA]'}
        >
          Read more
        </Button>
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
              <h1 className={'text-xl font-bold'}>Advanced Search</h1>
              <Dialog.Close>
                <X>Close</X>
              </Dialog.Close>
            </div>

            <div className={'flex h-full flex-col space-y-6 bg-gray-100 p-6'}>
              <p className={'pb-4'}>{description}</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ShowMoreDescription;
