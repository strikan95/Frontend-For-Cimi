import 'server-only';
import { getSession } from '@auth0/nextjs-auth0';
import { StreamChat } from 'stream-chat';

export const generateChatToken = async () => {
  const session = await getSession();

  const instance = StreamChat.getInstance(
    process.env.GET_STREAM_API_KEY!,
    process.env.GETSTREAM_SECRET!,
    { browser: false }
  );

  return instance.createToken(session?.user.sub!.replace('|', '_'));
};
