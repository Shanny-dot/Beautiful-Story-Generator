'use client';

import { useSearchParams } from 'next/navigation';

export async function POST(req: Request) {
  const { genre, mood, mainCharacter, setting, plot, ending } = await req.json();

  const prompt = `
Write a ${mood} ${genre} short story.
Main Character: ${mainCharacter}.
Setting: ${setting}.
Plot: ${plot}.
Ending Style: ${ending}.
Make it engaging and beautifully written within 2500 words.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // You’ll add this in .env
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await response.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    console.error("Groq API Error:", data);
    return NextResponse.json({ story: null }, { status: 500 });
  }

  const story = data.choices[0].message.content;
  return NextResponse.json({ story });
}
