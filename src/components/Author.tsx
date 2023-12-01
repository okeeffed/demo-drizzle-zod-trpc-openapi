"use client";
import { selectAuthorSchema } from "../libs/drizzle/zod";
import { z } from "zod";
import { trpc } from "@/libs/trpc/hooks";

// Note: This could and probably should be automated.
type Author = z.infer<typeof selectAuthorSchema>;

export function Author({ id }: { id: string }) {
  const { data: author } = trpc.authors.findUniqueAuthorById.useQuery({
    id,
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {author && (
        <div key={author.id}>
          <h2 className="text-2xl font-bold">{author.name}</h2>
        </div>
      )}
    </div>
  );
}
