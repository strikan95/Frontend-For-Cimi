'use client';

import React, { Suspense } from 'react';
import { Channel, StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { TFilterParams } from '@/lib/filter/useFilter';
import { Loading } from 'mml-react';

/*
type ChatContextType = {
  currentChannel?: Channel;
};

export const ChatContext = React.createContext<ChatContextType>({
  currentChannel: undefined,
});
*/

const ChatContext = React.createContext<{}>({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const [chatClient, setChatClient] = React.useState<StreamChat>();

  const test = StreamChat.getInstance('fvx8ceem6g95');

  const value = {};

  React.useEffect(() => {
    const initChat = async () => {
      if (!isLoading && user && user.sub) {
        console.log('USER: ' + user);
        const client = StreamChat.getInstance('fvx8ceem6g95');
        let didUserConnectInterrupt = false;

        const tokenResponse = await fetch('/api/token', { method: 'GET' });
        const token = await tokenResponse.json();

        console.log('TOKEN: ' + token.token);

        const status = await client.connectUser(
          {
            id: user.sub.replace('|', '_'),
            name: user.name || 'Anon',
            image: user.avatarUrl,
          },
          token.token
        );

        setChatClient(client);
      }

      return () => {
        console.log('Disconnecting...');
        if (chatClient) {
          chatClient.disconnectUser();
        }
      };
    };
    initChat();
  }, [isLoading, user]);

  if (!chatClient) {
    return <Suspense>{children}</Suspense>;
  }

  return (
    <Chat client={chatClient}>
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </Chat>
  );
};

export default ChatContextProvider;
