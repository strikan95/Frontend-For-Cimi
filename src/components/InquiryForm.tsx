'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DateInput, TextInput } from '@/components/ui/form-input';
import { useUser } from '@auth0/nextjs-auth0/client';
import { InitialMessage, useChatContext } from '@/lib/chat/ChatProvider';
import { useRouter } from 'next/navigation';
import { id } from 'date-fns/locale';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  message: z.string(),
  name: z.string(),
  date: z.date(),
});

function InquiryForm({ hostId }: { hostId: string }) {
  const { user, isLoading } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      name: '',
      date: undefined,
    },
  });

  const ctx = useChatContext();
  const router = useRouter();

  console.log(ctx);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (user != undefined && user.sub) {
      const userId = user.sub;
      const message = values as InitialMessage;
      const channelId = await ctx.startDM({ hostId, userId, message });
      router.push(`/messenger?channel=${channelId}`);
    }
  }

  /*  async function handleClick() {
    if (isLoading || user == undefined || user.sub == undefined) return;

    const channel = client?.channel('messaging', {
      members: [user.sub.replace('|', '_'), host.replace('|', '_')],
    });
    const res = await channel?.create();
  }*/
  //{!isLoading && <Button onClick={handleClick}>Start chat</Button>}
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <h1 className={'pb-6 text-xl font-bold'}>Contact Form</h1>
          <div className={'flex flex-col gap-4 pb-6'}>
            <TextInput
              name={'message'}
              label={'Message'}
              placeholder={'Here goes your message'}
            />
            <TextInput
              name={'name'}
              label={'Name'}
              placeholder={'John Smith'}
            />
            <DateInput
              name={'date'}
              label={'Date'}
              placeholder={'mm/dd/yyyy'}
            />
            {!ctx.isLoading && ctx.client ? (
              <Button type={'submit'}>Send inquiry</Button>
            ) : (
              <div>Please log in to send a message</div>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

export default InquiryForm;
