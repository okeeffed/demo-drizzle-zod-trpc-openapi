import { createId } from "@paralleldrive/cuid2";
import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  foreignKey,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  checksum: varchar("checksum", { length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text("logs"),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const author = pgTable(
  "Author",
  {
    id: text("id").primaryKey().notNull().default(createId()),
    name: text("name").notNull(),
    email: text("email").notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("Author_email_key").on(table.email),
    };
  }
);

export const post = pgTable("Post", {
  id: text("id").primaryKey().notNull().default(createId()),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").default(false).notNull(),
  authorId: text("authorId")
    .notNull()
    .references(() => author.id, { onDelete: "restrict", onUpdate: "cascade" }),
});
