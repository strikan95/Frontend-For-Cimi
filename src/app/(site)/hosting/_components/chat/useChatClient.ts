import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useUser } from '@auth0/nextjs-auth0/client';

export const useChatClient = ({
  apiKey,
}: {
  apiKey: string;
}): StreamChat | undefined => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMl8xMDA3MTUwNTAzMTUyNDU2NjI1NDgifQ.Wobrmd02toB2B0WMJ5nElJV4dfUlXi875YhkVcqETAc';
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      const client = new StreamChat(apiKey);
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;

      const connectionPromise = client
        .connectUser({ id: user.sub!.replace('|', '_') }, userToken)
        .then(() => {
          if (!didUserConnectInterrupt) {
            setChatClient(client);
          }
        });

      return () => {
        didUserConnectInterrupt = true;
        setChatClient(undefined);
        // wait for connection to finish before initiating closing sequence
        connectionPromise.then(() => client.disconnectUser()).then(() => {});
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should re-run only if user.id changes
  }, [isLoading, user]);

  return chatClient;
};
