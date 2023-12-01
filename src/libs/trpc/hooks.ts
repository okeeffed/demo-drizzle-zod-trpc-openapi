"use client";
import { createTRPCReact } from "@trpc/react-query";
import { appRouter } from "@/server";

export const trpc = createTRPCReact<typeof appRouter>();
