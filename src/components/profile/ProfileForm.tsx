'use client';

import React, { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import ProfileImageUpdater from '@/components/profile/ProfileImageUpdater';
import { CimiApiProfile } from '@/lib/cimi/types/profile.types';
import { updateUserProfile } from '@/lib/cimi/api/profile';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
});

function ProfileForm({ profileData }: { profileData: CimiApiProfile }) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsUpdating(true);
    const res = await updateUserProfile(values);
    if (res.error) {
      toast.toast({
        title: 'Failure',
        description: res.error,
      });
    } else {
      toast.toast({
        title: 'Success',
        description: 'Profile updated!',
      });
    }
    setIsUpdating(false);
  }

  return (
    <div className="mx-auto mt-8 grid max-w-2xl">
      <ProfileImageUpdater picture={profileData.picture} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mt-8 items-center text-[#202142] sm:mt-14">
            <div
              className="mb-2 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row
                sm:space-x-4 sm:space-y-0"
            >
              <FormField
                control={form.control}
                name="firstName"
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
                name="lastName"
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
          <Button className={'mt-4 w-full'} type="submit">
            {isUpdating ? (
              <Loader2 className={'animate-spin'} />
            ) : (
              'Update Profile Information'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
