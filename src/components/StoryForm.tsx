'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Types
type StoryFormData = {
  title: string;
  genre: string;
  mood: string;
  mainCharacter: string;
  setting: string;
  plot: string;
  ending: string;
};

const genres = ["Fantasy", "Romance", "Sci-fi", "Mystery", "Comedy", "Horror", "Adventure"];
const moods = ["Wholesome", "Dark", "Inspiring", "Funny", "Chill"];
const endings = ["Happy", "Sad", "Twist", "Open-ended", "AI decides"];

export default function StoryForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<StoryFormData>({
    defaultValues: {
      title: '',
      genre: '',
      mood: '',
      mainCharacter: '',
      setting: '',
      plot: '',
      ending: ''
    }
  });

  const onSubmit = async (data: StoryFormData) => {
    setLoading(true);

    const res = await fetch("/api/generate-story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!result || !result.story) {
      alert("No story received from API");
      setLoading(false);
      return;
    }

    router.push(`/story?text=${encodeURIComponent(result.story)}`);
    setLoading(false);
  };

  return (
    <Card className="shadow-lg w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Beautiful Story Generator</CardTitle>
        <CardDescription>Fill the form to generate a short story</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Enchanted Forest" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="genre"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select genre" /></SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="mood"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mood</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="Pick a vibe" /></SelectTrigger>
                      <SelectContent>
                        {moods.map((mood) => (
                          <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="mainCharacter"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Character Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Luna the Brave" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="setting"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setting</FormLabel>
                  <FormControl>
                    <Input placeholder="Magical forest, Futuristic city..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="plot"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot Ideas (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A talking rabbit helps the hero escape..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="ending"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ending Style</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="Choose ending type" /></SelectTrigger>
                      <SelectContent>
                        {endings.map((ending) => (
                          <SelectItem key={ending} value={ending}>{ending}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Generating Story..." : "Generate Story"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}