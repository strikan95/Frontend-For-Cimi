'use client';

import React from 'react';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';

import { useChatClient } from '@/app/(site)/hosting/_components/chat/useChatClient';

type Props = {
  apiKey: string;
  userToken: string;
};

function ChatBox({ apiKey, userToken }: Props) {
  const client = useChatClient({ apiKey: apiKey, userToken: userToken });

  if (!client) return null;

  return (
    <Chat client={client}>
      <ChannelList />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default ChatBox;
