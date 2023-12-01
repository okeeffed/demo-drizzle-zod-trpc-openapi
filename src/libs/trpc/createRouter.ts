import * as trpc from "@trpc/server";
// import { permissions } from "./permissions";
import type { Context } from "./context";
import trpcOptions from "./options";
import { OpenApiMeta } from "trpc-openapi";

export const t = trpc.initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create(trpcOptions);

export const globalMiddleware = t.middleware(async ({ ctx, next }) => {
  console.log("inside middleware!");
  return next();
});

// export const permissionsMiddleware = t.middleware(permissions);

export const publicProcedure = t.procedure;
export const shieldedProcedure = t.procedure.use(globalMiddleware);
// .use(permissionsMiddleware);
