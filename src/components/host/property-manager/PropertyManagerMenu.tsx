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
import AvailabilityManager from '@/components/host/property-manager/AvailabilityManager';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { addRentPeriod, deleteListing } from '@/lib/cimi/api/host';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { DateInputModal } from '@/components/ui/form-input';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RentPeriods } from '@/lib/cimi/types/listingData.types';

type Props = {
  id: number;
  status: 'draft' | 'pending' | 'approved';
  rentPeriods: RentPeriods[];
};

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

function PropertyManagerMenu({ id, status, rentPeriods }: Props) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false);
  const dropdownTriggerRef = React.useRef(null);

  const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  //values: z.infer<typeof formSchema>
  async function handleCreateNewRentPeriod() {
    const values = form.getValues() as z.infer<typeof formSchema>;
    try {
      const res = await addRentPeriod(values, id.toString());
      if (res.error) {
        toast.toast({
          title: 'Failure',
          description: 'Rent periods are overlapping',
        });
        return;
      }

      toast.toast({
        title: 'Success',
        description: 'Rent period created!',
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete() {
    const res = await deleteListing(id);

    const isError = res.error;
    if (isError) {
      toast.toast({
        title: 'Failure',
        description: res.error,
      });
      return;
    }

    toast.toast({
      title: 'Success',
      description: 'Listing deleted!',
    });
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
        <DropdownMenuItem
          onClick={() => router.push(`/listing/${id}`)}
          disabled={status != 'approved'}
        >
          View Listing
        </DropdownMenuItem>

        <DropdownDialogItem
          triggerChildren="Manage Availability"
          disabled={status != 'approved'}
          onOpenChange={handleDialogItemOpenChange}
        >
          <div className={'flex flex-col gap-4'}>
            <Dialog.Title className={'text-xl font-bold'}>
              Manage Availability
            </Dialog.Title>
            <Dialog.Description>
              Create a new rent period for this property. Your property will be
              marked as occupied for the selected period.
            </Dialog.Description>
            <Form {...form}>
              <form className="space-y-6">
                <DateInputModal
                  disabled={rentPeriods}
                  name={'startDate'}
                  label={'Start Date'}
                  placeholder={'mm/dd/yyyy'}
                />
                <DateInputModal
                  disabled={rentPeriods}
                  name={'endDate'}
                  label={'End Date'}
                  placeholder={'mm/dd/yyyy'}
                />
              </form>
            </Form>
            <Dialog.Close asChild>
              <Button
                disabled={
                  form.getValues('startDate') == undefined ||
                  form.getValues('endDate') == undefined
                }
                onClick={handleCreateNewRentPeriod}
                className={'mt-6 w-full'}
                type={'button'}
              >
                Submit
              </Button>
            </Dialog.Close>
          </div>
        </DropdownDialogItem>

        {/*        <DropdownMenuItem disabled={true}>View Calendar</DropdownMenuItem>*/}
        {/*        <DropdownMenuItem disabled={true}>Suspend</DropdownMenuItem>*/}
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
