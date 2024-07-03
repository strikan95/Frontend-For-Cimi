import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export const useChatClient = ({
  apiKey,
  userToken,
}: {
  apiKey: string;
  userToken: string;
}): StreamChat | undefined => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      const client = new StreamChat('fvx8ceem6g95');
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
