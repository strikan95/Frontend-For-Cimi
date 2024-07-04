import 'server-only';
import { StreamChat } from 'stream-chat';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

export const generateChatToken = async () => {
  const session = await getServerSession(authOptions);

  const instance = StreamChat.getInstance(
    process.env.GET_STREAM_API_KEY!,
    process.env.GETSTREAM_SECRET!,
    { browser: false }
  );

  return instance.createToken(session?.user.email.replace('.', '_') || '');
};
