import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(_req) {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Tell me a joke!`,
    stream: true,
    max_tokens: 1000,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
