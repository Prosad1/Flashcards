import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = 'Im gonna ask you things, respond with words on the front and description on the back, return your response in the following json format {"flashcards"{"front": str, "back": str}} ONLY GENERATE 10 FLASHCARDS ABOUT YOUR DAY'

export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  const data = await req.text()

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'gpt-4o',
    response_format: {type: 'json_object'},
  })

  console.log(completion.choices[0].message.content)

  const flashcards = JSON.parse(completion.choices[0].message.content)

  return NextResponse.json(flashcards.flashcards)
}