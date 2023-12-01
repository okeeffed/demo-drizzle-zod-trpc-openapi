import superjson from "superjson";

const trpcOptions = {
  // @ts-expect-error: TODO: fix this
  errorFormatter: ({ error, shape }) => {
    if (
      error.code === "INTERNAL_SERVER_ERROR" &&
      process.env.NODE_ENV === "production"
    ) {
      return { ...shape, message: "Internal server error" };
    }

    return shape;
  },
  // We use superjson for serialization purposes.
  // It comes with the added benefit of letting us use Prisma
  // types directly since the transformer will keep the
  // Prisma specific properties as expected (for Dates at least).
  transformer: superjson,
};

export default trpcOptions;
