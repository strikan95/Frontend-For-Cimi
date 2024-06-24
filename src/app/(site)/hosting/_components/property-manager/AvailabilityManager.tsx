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

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

function AvailabilityManager({ id }: { id: string }) {
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
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={'flex flex-col gap-4'}>
      <Dialog.Title className={'text-xl font-bold'}>
        Manage Availability
      </Dialog.Title>
      <Dialog.Description>
        Create a new rent period for this property. Your property will be marked
        as occupied for the selected period.
      </Dialog.Description>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
          <Button type={'submit'} className={'mt-6 w-full'}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AvailabilityManager;
