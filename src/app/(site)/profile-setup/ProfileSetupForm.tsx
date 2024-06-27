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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { ApiProfile } from '@/lib/cimi/types/profile.types';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { finishUserProfile } from '@/lib/auth/profile';
import ProfileImageUpdater from '@/app/(site)/profile-setup/ProfileImageUpdater';
import { useRouter } from 'next/navigation';

const accountTypes = ['ROLE_STUDENT', 'ROLE_HOST'] as const;
function renderTypeString(roleType: string) {
  const type = roleType.split('_')[1].toLowerCase();
  return type[0].toUpperCase() + type.slice(1);
}

const formSchema = z.object({
  email: z.string(),
  role: z.enum(accountTypes),
  userDetails: z.object({
    firstName: z.string().min(2).max(64),
    lastName: z.string().min(2).max(64),
  }),
});

function ProfileSetupForm({ apiUserData }: { apiUserData: ApiProfile }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: apiUserData.email,
      role: 'ROLE_STUDENT',
      userDetails: {
        firstName: apiUserData.userDetails.firstName,
        lastName: apiUserData.userDetails.lastName,
      },
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const res = await finishUserProfile(values);

    if (!res.error) {
      router.push('/');
    }
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
            <div className="mb-2 sm:mb-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem aria-autocomplete={'none'}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="my@email.com"
                        {...field}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2 sm:mb-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select Account Type</FormLabel>
                    <FormControl className={'w-full'}>
                      <RadioGroup.Root
                        className="flex w-fit flex-col gap-2.5"
                        onValueChange={field.onChange}
                        aria-label="View density"
                        defaultChecked={true}
                        defaultValue={accountTypes[0]}
                      >
                        <div className={`flex w-full flex-wrap gap-4`}>
                          {accountTypes.map((option, index) => {
                            return (
                              <div
                                key={index}
                                className="flex w-full items-center lg:w-[48%]"
                              >
                                <RadioGroup.Item
                                  className="relative flex h-12 w-full flex-grow cursor-default flex-col items-center
                                    justify-center rounded-lg border-2 bg-white outline-none hover:border-blue-200
                                    data-[state=checked]:border-blue-500 lg:h-16"
                                  value={option}
                                  id={option}
                                >
                                  <RadioGroup.Indicator
                                    className={
                                      'absolute right-2 top-2 rounded-full bg-blue-300 p-1'
                                    }
                                  >
                                    <Check className={'h-4 w-4'} />
                                  </RadioGroup.Indicator>
                                  <label
                                    className="text-[15px] leading-none"
                                    htmlFor={option}
                                  >
                                    {renderTypeString(option)}
                                  </label>
                                </RadioGroup.Item>
                              </div>
                            );
                          })}
                        </div>
                      </RadioGroup.Root>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type={'submit'} className={'w-full'}>
            Finish Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileSetupForm;
