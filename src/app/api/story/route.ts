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

  // Check the Run status
  let run_status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (run_status.status != "completed") {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    run_status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }

  // Display the Assistant's Response
  const messages: any = await openai.beta.threads.messages.list(thread.id);
  const message_id = messages.body.first_id;

  // Retrieve AI response
  const ai_response: any = await openai.beta.threads.messages.retrieve(
    thread.id,
    message_id
  );

  return NextResponse.json(
    { messages: ai_response.content[0].text.value },
    { status: 200 }
  );
}
