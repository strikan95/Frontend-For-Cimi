'use client';

import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Control, FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/lib/cimi/api/register';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(32),
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
  roles: z.enum(['ROLE_STUDENT', 'ROLE_HOST']),
});

function InputField({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<any>;
  name: FieldPath<any>;
  label: string;
  placeholder: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className={'h-16'} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
          <FormDescription></FormDescription>
        </FormItem>
      )}
    />
  );
}

function RegisterForm() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      roles: 'ROLE_STUDENT',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const res = await registerUser(values);
    if (res.error) {
      toast.toast({ title: 'Failure', description: res.error });
      return;
    }

    await signIn('credentials', {
      username: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/',
    });

    setIsLoading(false);
  }

  return (
    <div
      className={
        'flex flex-col items-center justify-center lg:mx-auto lg:max-w-lg'
      }
    >
      <Form {...form}>
        <form
          className={'flex w-full flex-col px-8 lg:max-w-lg'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className={'self-start pb-2'}>
            <h1 className={'text-xl font-bold'}>Register a new account</h1>
          </div>

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem className="space-y-3 pb-2">
                <FormLabel>Are you a student or a host?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ROLE_STUDENT" />
                      </FormControl>
                      <FormLabel className="font-lg">Student</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ROLE_HOST" />
                      </FormControl>
                      <FormLabel className="font-lg">Host</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputField
            control={form.control}
            label={'Email'}
            name={'email'}
            placeholder={'john.doe@example.com'}
          />
          <InputField
            control={form.control}
            label={'Password'}
            name={'password'}
            placeholder={''}
          />
          <InputField
            control={form.control}
            label={'First Name'}
            name={'firstName'}
            placeholder={'John'}
          />
          <InputField
            control={form.control}
            label={'Last Name'}
            name={'lastName'}
            placeholder={'Doe'}
          />
          <Button type={'submit'}>Register</Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;
