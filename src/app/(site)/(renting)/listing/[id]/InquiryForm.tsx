'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

function DateInput({ name, label, placeholder }) {
  return (
    <FormField
      name="dob"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className={'py-[5px]'}>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function TextInput({ name, label, placeholder }) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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
        <DateInput name={'date-range'} label={'Date'} placeholder={'S'} />
        <Button type={'submit'}>Send inquiry</Button>
      </div>
    </Form>
  );
}

export default InquiryForm;
