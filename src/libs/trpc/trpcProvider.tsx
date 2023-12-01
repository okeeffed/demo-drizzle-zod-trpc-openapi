"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "@/libs/trpc/hooks";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import superjson from "superjson";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  // TODO: Check this works
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      // links: [
      //   loggerLink({
      //     enabled: () => true,
      //   }),
      //   httpBatchLink({
      //     url,
      //     fetch: async (input, init?) => {
      //       const fetch = getFetch();
      //       return fetch(input, {
      //         ...init,
      //         credentials: "include",
      //       });
      //     },
      //   }),
      // ],
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
      transformer: superjson,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
