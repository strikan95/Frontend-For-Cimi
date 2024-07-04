'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DateInput, TextInput } from '@/components/ui/form-input';
import { InitialMessage, useChatContext } from '@/lib/chat/ChatProvider';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  message: z.string(),
  date: z.date(),
});

function InquiryForm({ hostId }: { hostId: string }) {
  const { data, status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      date: undefined,
    },
  });

  const ctx = useChatContext();
  const router = useRouter();

  const user = data?.user;
  if (user) {
    async function handleSubmit(values: z.infer<typeof formSchema>) {
      if (user != undefined && user.email) {
        const userId = user.id.toString();
        const message = values as InitialMessage;
        const channelId = await ctx.startDM({ hostId, userId, message });
        router.push(`/messenger?channel=${channelId}`);
      }
    }

    return (
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <h1 className={'pb-6 text-xl font-bold'}>Contact Form</h1>
            <div className={'flex flex-col gap-4 pb-6'}>
              <TextInput
                name={'message'}
                label={'Message'}
                placeholder={'Here goes your message'}
              />
              <DateInput
                name={'date'}
                label={'Date'}
                placeholder={'mm/dd/yyyy'}
              />
              <Button type={'submit'}>Send inquiry</Button>
            </div>
          </form>
        </Form>
      </>
    );
  } else {
    return (
      <div className={'flex w-full justify-center'}>
        Please log in to send a message
      </div>
    );
  }
}

export default InquiryForm;
