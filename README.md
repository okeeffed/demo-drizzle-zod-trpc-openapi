This repo was a clone of another that extended it to see how `drizzle-zod`, `trpc`, `react-query` and `trpc-openapi` could work with Drizzle and Next.js.

The aim was to generate public-facing APIs that autogenerate OpenAPI files that could be used for preventing breaking changes (something like I wrote years ago [here](https://blog.dennisokeeffe.com/blog/2020-09-20-openapi-diff))

There is one downside to this repo: I could not quite configure `trpc@next` and `react-query@^5` to work with `trpc-openapi`. There are some major changes that require changes to `trpc-openapi` to work as expected.

## CHANGES MADE (incomplete)

Install `zod` and `drizzle-zod`.

For `trpc`, install with `@next` to support React Query 5.

> Update: Cannot support React Query 5 just yet.

`pnpm add @trpc/client@next @trpc/react-query@next @trpc/server@next @tanstack/react-query`

Next, setup the `src/utils/trpc` folder:

1. `context.ts` is used if you need to pass context like users/auth. It is used within the `trpc` route.
2. `hooks.ts` will expose the hooks that can be used. It is used wherever we need to make a fetch.
3. `options.ts` has extra config for `trpcOptions`. This can be used for transformers like `superjson`. Right now, this isn't being used and might be subject to removal. It's used for the generator in Prisma in other projects.
4. `trpcProvider` is used in the application/layout.

We need to setup the files that these items are used.

1. Setup `src/app/trpc/[trpc]/route.ts`.
2. Add the `TrpcProvider` to the `layout.ts` component.

For OpenAPI generation, you must install `trpc-openapi`.

Update `initTRPC` to be `const t = initTRPC.meta<OpenApiMeta>().create();`.

Update the procedure calls to include `meta`:

```ts
export const appRouter = t.router({
  sayHello: t.procedure
    .meta({ /* 👉 */ openapi: { method: 'GET', path: '/say-hello' } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    });
});
```

Add a script to generate the OpenAPI document:

```ts
import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "../appRouter";

/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:3000",
});
```

Also ensure that `@tanstack/react-query-devtools` and `superjson` are installed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
