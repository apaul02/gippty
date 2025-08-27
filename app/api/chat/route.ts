import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, smoothStream } from 'ai';

// Allow streaming responses up to 30 seconds

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: convertToModelMessages(messages),
    experimental_transform: smoothStream()
  });

  return result.toUIMessageStreamResponse();
}
