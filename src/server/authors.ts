import { t } from "@/libs/trpc/createRouter";
import { db } from "@/utils/db";
import { z } from "zod";
import { selectAuthorSchema, insertAuthorSchema } from "../libs/drizzle/zod";
import { schema } from "../libs/drizzle/schema";
import { sql } from "drizzle-orm/sql";
import { createId } from "@paralleldrive/cuid2";

export const authors = t.router({
  findManyAuthors: t.procedure
    .meta({ openapi: { method: "GET", path: "/authors" } })
    .input(z.void())
    .output(z.array(selectAuthorSchema))
    .query(async () => {
      return await db.query.authors.findMany();
    }),
  findUniqueAuthorById: t.procedure
    .meta({ openapi: { method: "GET", path: "/authors/{id}" } })
    .input(z.object({ id: z.string() }))
    .output(selectAuthorSchema)
    .query(async (req) => {
      const result = await db.execute<z.infer<typeof selectAuthorSchema>>(
        sql`SELECT * FROM ${schema.authors} WHERE ${schema.authors.id} = ${req.input.id}`
      );
      return result[0];
    }),
  createAuthor: t.procedure
    .meta({ openapi: { method: "POST", path: "/authors" } })
    .input(insertAuthorSchema.omit({ id: true }))
    .output(selectAuthorSchema)
    .mutation(async (req) => {
      const result = await db
        .insert(schema.authors)
        .values({
          id: createId(),
          ...req.input,
        })
        .returning();
      return result[0];
    }),
});
