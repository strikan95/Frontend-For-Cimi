'use client';

import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DateInput, TextInput } from '@/components/ui/form-input';
import { useChatClient } from '@/app/(site)/hosting/_components/chat/useChatClient';
import { useUser } from '@auth0/nextjs-auth0/client';

function InquiryForm({ host, chatToken }: { host: string; chatToken: string }) {
  const { user, isLoading } = useUser();

  const form = useForm({ defaultValues: { message: '' } });
  const client = useChatClient({
    apiKey: process.env.GET_STREAM_API_KEY!,
    userToken: chatToken,
  });

  async function handleClick() {
    if (isLoading || user == undefined || user.sub == undefined) return;

    console.log('HOST: ' + host + ' CALLER: ' + user.sub);

    const channel = client?.channel('messaging', {
      members: [user.sub.replace('|', '_'), host.replace('|', '_')],
    });
    await channel?.create();
  }

  return (
    <>
      {!isLoading && <Button onClick={handleClick}>Start chat</Button>}
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
    </>
  );
}

export default InquiryForm;
