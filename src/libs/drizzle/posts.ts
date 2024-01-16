import { pgTable, text, boolean } from 'drizzle-orm/pg-core';

export const posts = pgTable('Post', { id: text('id').primaryKey(), title: text('title').notNull(), content: text('content'), published: boolean('published').notNull(), authorId: text('authorId').notNull() });