import { pgTable, text } from 'drizzle-orm/pg-core';

export const authors = pgTable('Author', { id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull() });