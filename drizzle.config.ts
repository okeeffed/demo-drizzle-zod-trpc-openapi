import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/libs/drizzle/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
  out: "./src/libs/drizzle",
});
