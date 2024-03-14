'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DateInput, TextInput } from '@/components/ui/form-input';

function InquiryForm() {
  const form = useForm({ defaultValues: { message: '' } });

  return (
    <Form {...form}>
      <h1 className={'pb-6 text-xl font-bold'}>Contact Form</h1>
      <div className={'flex flex-col gap-4 pb-6'}>
        <TextInput
          name={'message'}
          label={'Message'}
          placeholder={'Here goes your message'}
        />
        <TextInput name={'name'} label={'Name'} placeholder={'John Smith'} />
        <DateInput
          name={'date-range'}
          label={'Date'}
          placeholder={'mm/dd/yyyy'}
        />
        <Button type={'submit'}>Send inquiry</Button>
      </div>
    </Form>
  );
}

export default InquiryForm;
