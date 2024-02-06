import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // Create a new Thread
  const thread = await openai.beta.threads.create();
  const { data } = await req.json();

  // Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: `${data.longitude}, ${data.latitude}`, // add user coordinates here
  });

  // Run the Assistant (Location->POI)
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.OPENAI_LOCATION_TO_POI_ASSISTENT
      ? process.env.OPENAI_LOCATION_TO_POI_ASSISTENT
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
