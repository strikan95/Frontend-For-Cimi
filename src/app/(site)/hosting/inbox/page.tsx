import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import ChatBox from '@/app/(site)/hosting/_components/chat/ChatBox';

async function InboxList() {
  const messages = [
    {
      user: {
        name: 'John Smith',
        avatar: `https://picsum.photos/seed/${Math.random()}/64/64`,
      },
      message: 'Hello, Im interested...',
    },
    {
      user: {
        name: 'Djuro Peric',
        avatar: `https://picsum.photos/seed/${Math.random()}/64/64`,
      },
      message: 'Hi, Could you tell me more...',
    },
    {
      user: {
        name: 'Pero Djuric',
        avatar: `https://picsum.photos/seed/${Math.random()}/64/64`,
      },
      message: 'Hello, I would like to...',
    },
  ];

  return (
    <div className={'flex flex-col gap-4 lg:w-1/2'}>
      <h1 className={'text-3xl font-bold'}>Inbox</h1>
      <div className={'flex w-full flex-col gap-1'}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`grid h-16 grid-cols-2 items-center justify-center rounded-lg border
              border-gray-300 px-2`}
          >
            <div className={'col-span-1 flex items-center gap-4'}>
              <Avatar className={'h-8 w-8'}>
                <AvatarImage src={message.user.avatar} />
              </Avatar>
              <p>{message.user.name}</p>
            </div>

            <p className={'col-span-1'}>{message.message}</p>
          </div>
        ))}
      </div>
      <Button className={'w-fit'}>Load More</Button>
    </div>
  );
}

async function Page() {
  return (
    <div className={'min-h-[calc(100svh-4rem)]'}>
      <ChatBox apiKey={process.env.GET_STREAM_API_KEY!} />
    </div>
  );
}

export default Page;
