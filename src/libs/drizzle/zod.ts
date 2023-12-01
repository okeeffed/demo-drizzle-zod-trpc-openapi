import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { post, author } from "./schema";

// Schema for inserting a user - can be used to validate API requests
export const insertAuthorSchema = createInsertSchema(author);

// Schema for selecting a user - can be used to validate API responses
export const selectAuthorSchema = createSelectSchema(author);
