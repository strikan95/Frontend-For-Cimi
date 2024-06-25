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
import { useUser } from '@auth0/nextjs-auth0/client';

function Page() {
  const params = useSearchParams();
  const chat = useChatContext();
  const { user, isLoading } = useUser();

  const filters = { members: { $in: [user?.sub?.replace('|', '_')] } };
  const options = { limit: 10 };

  /*  React.useEffect(() => {
    if (user && user.sub) {
      filters = { members: { $in: [user.sub.replace('|', '_')] } };
    }
  }, [isLoading]);*/

  return (
    <div className={'pb-16'}>
      {!chat.isLoading && !isLoading && (
        <>
          <ChannelList
            filters={filters}
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
