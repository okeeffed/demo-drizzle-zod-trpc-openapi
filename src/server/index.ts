import { t } from "@/libs/trpc/createRouter";
import { authors } from "@/server/authors";

const appRouter = t.router({
  authors,
});

export { appRouter };
