import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }); // Create a new Thread
  const thread = await openai.beta.threads.create();

  const { data } = await req.json();
  // Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: data.message, // add selected POI
  });

  // Run the Assistant (POI->Story)
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.OPENAI_POI_TO_STORY_ASSISTENT
      ? process.env.OPENAI_POI_TO_STORY_ASSISTENT
      : "",
    instructions: "", // no additional instructions needed
  });
  return NextResponse.json(
    { thread_id: thread.id, run_id: run.id },
    { status: 200 }
  );
}
