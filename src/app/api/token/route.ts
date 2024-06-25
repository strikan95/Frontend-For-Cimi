import 'server-only';
import { getSession } from '@auth0/nextjs-auth0';
import { StreamChat } from 'stream-chat';

export async function GET() {
  const session = await getSession();

  if (!session?.user) {
    return Response.error();
  }

  const instance = StreamChat.getInstance(
    process.env.GET_STREAM_API_KEY!,
    process.env.GETSTREAM_SECRET!,
    { browser: false }
  );

  const token = instance.createToken(session?.user.sub!.replace('|', '_'));

  return Response.json({ token: token });
}

//export async function DELETE() {}
