"use client";
import { selectAuthorSchema } from "../libs/drizzle/zod";
import { z } from "zod";
import { trpc } from "@/libs/trpc/hooks";

// Note: This could and probably should be automated.
type Author = z.infer<typeof selectAuthorSchema>;

export function Authors({ defaultAuthors = [] }: { defaultAuthors: Author[] }) {
  const { data: authors } = trpc.authors.findManyAuthors.useQuery(undefined, {
    initialData: defaultAuthors,
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {authors?.map((author) => (
        <div key={author.id}>
          <h2 className="text-2xl font-bold">{author.name}</h2>
        </div>
      ))}
    </div>
  );
}
