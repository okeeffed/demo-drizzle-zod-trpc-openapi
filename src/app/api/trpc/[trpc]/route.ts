import {
  // FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
// TODO: Add the app router.
import { appRouter } from "@/server";
import { createContext } from "@/libs/trpc/context";

// this is the server RPC API handler

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};

export const GET = handler;
export const POST = handler;
