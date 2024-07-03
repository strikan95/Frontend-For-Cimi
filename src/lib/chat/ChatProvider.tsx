'use client';

import React, { Suspense } from 'react';
import { ConnectionOpen, DefaultGenerics, StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useSession } from 'next-auth/react';

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
  const { data, status } = useSession();
  const [chatClient, setChatClient] = React.useState<StreamChat>();
  const [isChatLoading, setIsChatLoading] = React.useState(true);

  React.useEffect(() => {
    const initChat = async () => {
      if (status == 'authenticated') {
        const client = StreamChat.getInstance('fvx8ceem6g95');
        let didUserConnectInterrupt = false;

        const tokenResponse = await fetch('/api/token', { method: 'GET' });
        const token = await tokenResponse.json();

        try {
          const chatStatus = await client.connectUser(
            {
              id: data?.user.id.toString(),
              name: data?.user.name || 'Anon',
              image: data?.user.image,
            },
            token.token
          );
        } catch (e) {
          console.error(e);
        }

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
  }, [status, data]);

  if (!chatClient) {
    return <Suspense>{children}</Suspense>;
  }

  const startDM = async (props: StartDMProps) => {
    const userId = props.userId.toString();
    const hostId = props.hostId.toString();

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
