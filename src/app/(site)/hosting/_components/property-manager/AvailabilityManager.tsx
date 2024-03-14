'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateInput, DateInputModal } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  from: z.string(),
  to: z.string(),
});

function AvailabilityManager() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: '',
    },
  });

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
        <DateInputModal
          name={'from'}
          label={'Start Date'}
          placeholder={'mm/dd/yyyy'}
        />
        <DateInputModal
          name={'to'}
          label={'End Date'}
          placeholder={'mm/dd/yyyy'}
        />
        <Button type={'submit'} className={'mt-6 w-full'}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AvailabilityManager;
