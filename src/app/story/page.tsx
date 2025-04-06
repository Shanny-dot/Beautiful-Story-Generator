'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic'; // 👈 This line disables prerendering

export default function StoryPage() {
  const searchParams = useSearchParams();
  const [story, setStory] = useState<string | null>(null);

  useEffect(() => {
    const text = searchParams.get("text");
    setStory(text ? decodeURIComponent(text) : null);
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Your Story ✨</h1>
      <div className="bg-white p-6 rounded shadow-md whitespace-pre-wrap leading-relaxed">
        {story || "No story found."}
      </div>
    </div>
  );
}
