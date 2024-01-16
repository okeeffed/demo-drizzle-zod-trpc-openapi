import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { schema } from "./schema";

// Schema for inserting a user - can be used to validate API requests
export const insertAuthorSchema = createInsertSchema(schema.authors);

// Schema for selecting a user - can be used to validate API responses
export const selectAuthorSchema = createSelectSchema(schema.authors);
