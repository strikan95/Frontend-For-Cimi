'use client';

import React from 'react';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { useSearchParams } from 'next/navigation';
import { useChatContext } from '@/lib/chat/ChatProvider';
import { useSession } from 'next-auth/react';

function Page() {
  const params = useSearchParams();
  const chat = useChatContext();
  const { data, status } = useSession();

  const options = { limit: 10 };

  const userId = data?.user?.email.replace('.', '_');

  if (!chat.client) {
    return <div>Loading chat ...</div>;
  }

  return (
    <div className={'pb-16'}>
      {userId && (
        <>
          <ChannelList
            filters={{ members: { $in: [userId] } }}
            sort={{ last_message_at: -1 }}
            options={options}
            customActiveChannel={params.get('channel') || ''}
          />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </>
      )}
    </div>
  );
}

export default Page;
