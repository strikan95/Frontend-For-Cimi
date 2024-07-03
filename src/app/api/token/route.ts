import 'server-only';
import { StreamChat } from 'stream-chat';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return Response.error();
  }

  const instance = StreamChat.getInstance(
    process.env.GET_STREAM_API_KEY!,
    process.env.GETSTREAM_SECRET!,
    { browser: false }
  );

  const token = instance.createToken(session?.user.id.toString());

  return Response.json({ token: token });
}

//export async function DELETE() {}
