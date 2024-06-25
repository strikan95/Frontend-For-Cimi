'use client';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateInputModal } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { addRentPeriod } from '@/lib/cimi/api/host';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

function AvailabilityManager({ id }: { id: string }) {
  const [dialogState, setDialogState] = React.useState<boolean | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await addRentPeriod(values, id);
      if (res.error) {
        //resolve backend errors
        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      if (!res.error) {
        setDialogState(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog.Root open={dialogState} onOpenChange={setDialogState}>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <div className={'flex flex-col gap-4'}>
        <Dialog.Title className={'text-xl font-bold'}>
          Manage Availability
        </Dialog.Title>
        <Dialog.Description>
          Create a new rent period for this property. Your property will be
          marked as occupied for the selected period.
        </Dialog.Description>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <DateInputModal
              name={'startDate'}
              label={'Start Date'}
              placeholder={'mm/dd/yyyy'}
            />
            <DateInputModal
              name={'endDate'}
              label={'End Date'}
              placeholder={'mm/dd/yyyy'}
            />
            <Button
              className={'mt-6 w-full'}
              type={'submit'}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className={'animate-spin'} /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </Dialog.Root>
  );
}

export default AvailabilityManager;
