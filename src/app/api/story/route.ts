import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { data } = await req.json();

  const run_id = data.run_id;
  const thread_id = data.thread_id;
  // Check the Run status
  let run_status = await openai.beta.threads.runs.retrieve(thread_id, run_id);
  while (run_status.status != "completed") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    run_status = await openai.beta.threads.runs.retrieve(thread_id, run_id);
  }

  // Display the Assistant's Response
  const messages: any = await openai.beta.threads.messages.list(thread_id);
  const message_id = messages.body.first_id;

  // Retrieve AI response
  const ai_response: any = await openai.beta.threads.messages.retrieve(
    thread_id,
    message_id
  );

  return NextResponse.json(
    { messages: ai_response.content[0].text.value },
    { status: 200 }
  );
}
