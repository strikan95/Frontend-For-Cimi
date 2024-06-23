import React from 'react';
import ChatBox from '@/app/(site)/hosting/_components/chat/ChatBox';
import { getSession } from '@auth0/nextjs-auth0';
import { generateChatToken } from '@/lib/auth/chatTokenGenerator';

async function Page() {
  const token = await generateChatToken();

  if (token) {
    return (
      <div className={'min-h-[calc(100svh-4rem)]'}>
        <ChatBox apiKey={process.env.GET_STREAM_API_KEY!} userToken={token} />
      </div>
    );
  }

  return <div className={'min-h-[calc(100svh-4rem)]'}>Error</div>;
}

export default Page;
