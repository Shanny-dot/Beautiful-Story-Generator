// app/story/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function StoryPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Your Story ✨</h1>
      <div className="bg-white p-6 rounded shadow-md whitespace-pre-wrap leading-relaxed">
        {text ? decodeURIComponent(text) : "No story found."}
      </div>
    </div>
  );
}