'use client';

import React, { Suspense } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useUser } from '@auth0/nextjs-auth0/client';

export type InitialMessage = {
  message: string;
  name: string;
  date: Date;
};

type StartDMProps = {
  hostId: string;
  userId: string;
  message: InitialMessage;
};

const ChatContext = React.createContext<{
  isLoading: boolean;
  client: StreamChat | undefined;
  startDM: (props: StartDMProps) => Promise<string>;
}>({
  isLoading: true,
  client: undefined,
  startDM: (props: StartDMProps) => Promise.resolve('undefined'),
});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const [chatClient, setChatClient] = React.useState<StreamChat>();
  const [isChatLoading, setIsChatLoading] = React.useState(true);

  React.useEffect(() => {
    const initChat = async () => {
      if (!isLoading && user && user.sub) {
        const client = StreamChat.getInstance('fvx8ceem6g95');
        let didUserConnectInterrupt = false;

        const tokenResponse = await fetch('/api/token', { method: 'GET' });
        const token = await tokenResponse.json();

        const status = await client.connectUser(
          {
            id: user.sub.replace('|', '_'),
            name: user.name || 'Anon',
            image: user.avatarUrl,
          },
          token.token
        );

        setChatClient(client);
        setIsChatLoading(false);
      }

      return () => {
        if (chatClient) {
          chatClient.disconnectUser();
        }
      };
    };

    initChat();
  }, [isLoading, user]);

  if (!chatClient) {
    return <Suspense fallback={<div>Loading</div>}>{children}</Suspense>;
  }

  const startDM = async (props: StartDMProps) => {
    const userId = props.userId.replace('|', '_');
    const hostId = props.hostId.replace('|', '_');

    const channel = chatClient?.channel('messaging', {
      members: [userId, hostId],
    });
    const res = await channel?.create();

    channel?.sendMessage({
      pinned: true,
      user: { id: userId },
      text: `Date of interest: ${props.message.date.toLocaleDateString()}\n ${props.message.message}`,
    });

    return res.channel.id;
  };

  const value = {
    isLoading: isChatLoading,
    client: chatClient,
    startDM: startDM,
  };

  return (
    <Chat client={chatClient}>
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </Chat>
  );
};

export const useChatContext = () => React.useContext(ChatContext);

export default ChatContextProvider;
