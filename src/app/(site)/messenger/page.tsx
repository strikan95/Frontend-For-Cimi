import React from 'react';
import ChatBox from '@/app/(site)/hosting/_components/chat/ChatBox';

async function Page() {
  return (
    <div className={'pb-16'}>
      <ChatBox apiKey={process.env.GET_STREAM_API_KEY!} />
    </div>
  );
}

export default Page;
