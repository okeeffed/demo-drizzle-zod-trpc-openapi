const fs = require("fs");
const jscodeshift = require("jscodeshift");
const addDefaultToIdTransformer = require("./addDefaultToIdTransformer");
const path = require("path");

function applyTransformation(file) {
  const source = fs.readFileSync(file, "utf8");
  const fileInfo = { source };
  const api = { jscodeshift, stats: () => {} };

  const newSource = addDefaultToIdTransformer(fileInfo, api);

  fs.writeFileSync(file, newSource);
}

// Replace 'path/to/your/file.ts' with the actual file path
applyTransformation(path.resolve(process.cwd(), "drizzle/schema.ts"));
