'use client';
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Menu, X } from 'lucide-react';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Dialog } from '@headlessui/react';
import { DialogClose, DialogContent } from '@/components/ui/dialog';

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`fixed bottom-0 right-0 z-40 m-6 lg:hidden`}>
        <Button
          onClick={() => setOpen(true)}
          className={'rounded-full bg-red-500 p-4'}
        >
          <Menu className={'h-6 w-6 text-white'} />
        </Button>
      </div>

      <Dialog open={open} onClose={setOpen}>
        <DialogContent
          overlay={false}
          close={false}
          className={'m-0 h-full w-full border-0 border-none p-0'}
        >
          <Navbar />
          <DialogClose
            onClick={() => setOpen(false)}
            className={'fixed bottom-0 right-0 m-6'}
          >
            <div className={'cursor-pointer rounded-full bg-red-500 p-4'}>
              <X className={'h-6 w-6 text-white'} />
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DrawerMobileMenu() {
  return (
    <Drawer direction={'left'}>
      <DrawerTrigger asChild className={'fixed bottom-0 right-0 z-40 m-6'}>
        <div className={'cursor-pointer rounded-full bg-red-500 p-4'}>
          <Menu className={'h-6 w-6 text-white'} />
        </div>
      </DrawerTrigger>
      <DrawerContent className={'max-h-full max-w-[85%]'}>
        <div className="mx-auto flex w-full max-w-md flex-col overflow-x-hidden rounded-t-[10px] p-4">
          <input className="my-8 border border-gray-400" placeholder="Input" />
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure
            rationally encounter consequences that are extremely painful. Nor
            again is there anyone who loves or pursues or desires to obtain pain
            of itself, because it is pain, but because occasionally
            circumstances occur in which toil and pain can procure him some
            great pleasure. To take a trivial example, which of us ever
            undertakes laborious physical exercise, except to obtain some
            advantage from it? But who has any right to find fault with a man
            who chooses to enjoy a pleasure that has no annoying consequences,
            or one who avoids a pain that produces no resultant pleasure?
          </p>
          <input className="my-8 border border-gray-400" placeholder="Input" />
          <p>
            On the other hand, we denounce with righteous indignation and
            dislike men who are so beguiled and demoralized by the charms of
            pleasure of the moment, so blinded by desire, that they cannot
            foresee the pain and trouble that are bound to ensue; and equal
            blame belongs to those who fail in their duty through weakness of
            will, which is the same as saying through shrinking from toil and
            pain. These cases are perfectly simple and easy to distinguish. In a
            free hour, when our power of choice is untrammelled and when nothing
            prevents our being able to do what we like best, every pleasure is
            to be welcomed and every pain avoided. But in certain circumstances
            and owing to the claims of duty or the obligations of business it
            will frequently occur that pleasures have to be repudiated and
            annoyances accepted. The wise man therefore always holds in these
            matters to this principle of selection: he rejects pleasures to
            secure other greater pleasures, or else he endures pains to avoid
            worse pains.
          </p>
          <input className="my-8 border border-gray-400" placeholder="Input" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileMenu;
