import { db } from "@/utils/db";
import { Authors } from "@/components/Authors";
import { Author } from "@/components/Author";
import { Suspense } from "react";

export default async function Home() {
  const defaultAuthors = await db.query.author.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Authors</h1>
      <Authors defaultAuthors={defaultAuthors} />
      <Suspense fallback={<div className="text-white">Loading author</div>}>
        <Author id={defaultAuthors[0].id} />
      </Suspense>
    </main>
  );
}
