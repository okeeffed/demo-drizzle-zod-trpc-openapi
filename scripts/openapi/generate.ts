import { appRouter } from "@/server";
import { generateOpenApiDocument } from "trpc-openapi";

async function main() {
  const openApiDocument = generateOpenApiDocument(appRouter, {
    title: "tRPC OpenAPI",
    version: "1.0.0",
    baseUrl: "http://localhost:3000",
  });

  const path = "./openapi.json";
  await Bun.write(path, JSON.stringify(openApiDocument));
}

void main();
