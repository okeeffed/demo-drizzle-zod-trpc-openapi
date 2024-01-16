import { db } from "@/utils/db";
import { Authors } from "@/components/Authors";
import { Author } from "@/components/Author";
import { Suspense } from "react";
import { schema } from "@/libs/drizzle/schema";

export default async function Home() {
  const defaultAuthors = await db.query.authors.findMany({
    with: {
      posts: true,
    },
  });

  const posts = await db.query.posts.findMany({
    with: {
      author: {
        with: {
          posts: {
            where: (post, { eq }) => eq(post.id, defaultAuthors[0].id),
          },
        },
      },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Authors</h1>
      <Authors defaultAuthors={defaultAuthors} />
      <Suspense fallback={<div className="text-white">Loading author</div>}>
        <Author id={defaultAuthors[0].id} />
        <p>{JSON.stringify(defaultAuthors[0].posts)}</p>
        <p>{JSON.stringify(posts)}</p>
      </Suspense>
    </main>
  );
}
