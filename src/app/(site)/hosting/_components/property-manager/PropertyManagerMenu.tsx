'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { DropdownDialogItem } from '@/components/ui/dropdown-menu-dialog-item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import AvailabilityManager from '@/app/(site)/hosting/_components/property-manager/AvailabilityManager';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function PropertyManagerMenu({ id }: { id: number }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef(null);

  function handleDelete() {
    console.log('deleted');
  }

  function handleDialogItemOpenChange(open: boolean) {
    if (!open) {
      setDropdownOpen(false);
      // prevents menu flashing after closing dialog
      setTimeout(() => {
        setHasOpenDialog(false);
      }, 50);
    } else {
      setHasOpenDialog(open);
    }
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button className={'text-lg font-bold'} ref={dropdownTriggerRef}>
          ...
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-gray-200 p-1"
        hidden={hasOpenDialog}
      >
        <DropdownMenuItem>
          <Link href={`/listing/${id}`}>View Listing</Link>
        </DropdownMenuItem>

        <DropdownDialogItem
          triggerChildren="Manage Availability"
          onOpenChange={handleDialogItemOpenChange}
        >
          <AvailabilityManager id={id.toString()} />
        </DropdownDialogItem>

        <DropdownMenuItem disabled={true}>View Calendar</DropdownMenuItem>
        <DropdownMenuItem disabled={true}>Suspend</DropdownMenuItem>
        <DropdownDialogItem
          triggerChildren="Delete"
          onOpenChange={handleDialogItemOpenChange}
        >
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this record?
          </Dialog.Description>
          <Dialog.Close asChild={true}>
            <Button
              onClick={handleDelete}
              className={'w-full'}
              variant={'destructive'}
            >
              Delete
            </Button>
          </Dialog.Close>
        </DropdownDialogItem>

        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PropertyManagerMenu;
