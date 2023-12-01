import * as schema from "../../libs/drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
  "postgresql://prisma:prisma@localhost:5432/demo_prisma_drizzle?search_path=public"
);
export const db = drizzle(queryClient, { schema });
