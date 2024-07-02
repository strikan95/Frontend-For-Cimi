'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { ApiProfile } from '@/lib/cimi/types/profile.types';
import { Button } from '@/components/ui/button';
import { finishUserProfile } from '@/lib/auth/profile';
import ProfileImageUpdater from '@/app/(site)/profile-setup/ProfileImageUpdater';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  userDetails: z.object({
    firstName: z.string().min(2).max(64),
    lastName: z.string().min(2).max(64),
  }),
});

function ProfileForm({ apiUserData }: { apiUserData: ApiProfile }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userDetails: {
        firstName: apiUserData.userDetails.firstName,
        lastName: apiUserData.userDetails.lastName,
      },
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const res = await finishUserProfile(values);
  }

  return (
    <div className="mx-auto mt-8 grid max-w-2xl">
      <ProfileImageUpdater picture={apiUserData.picture} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mt-8 items-center text-[#202142] sm:mt-14">
            <div
              className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row
                sm:space-x-4 sm:space-y-0"
            >
              <FormField
                control={form.control}
                name="userDetails.firstName"
                render={({ field }) => (
                  <FormItem aria-autocomplete={'none'}>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userDetails.lastName"
                render={({ field }) => (
                  <FormItem aria-autocomplete={'none'}>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type={'submit'} className={'w-full'}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
