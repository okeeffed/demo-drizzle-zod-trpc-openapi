module.exports = function (fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Function to add or ensure the import statement
  function addImportStatement() {
    const importDeclaration = j.importDeclaration(
      [j.importSpecifier(j.identifier("createId"))],
      j.literal("@paralleldrive/cuid2")
    );

    const existingImport = root.find(j.ImportDeclaration, {
      source: {
        type: "Literal",
        value: "@paralleldrive/cuid2",
      },
    });

    if (existingImport.size() === 0) {
      root.find(j.ImportDeclaration).at(0).insertBefore(importDeclaration);
    }
  }

  // Add the import statement
  addImportStatement();

  // Rest of the transformation logic
  root.find(j.VariableDeclarator).forEach((path) => {
    if (path.node.id && path.node.id.name !== "prismaMigrations") {
      j(path)
        .find(j.ObjectExpression)
        .forEach((objPath) => {
          objPath.node.properties.forEach((prop) => {
            if (prop.key && prop.key.name === "id") {
              prop.value = j.callExpression(
                j.memberExpression(prop.value, j.identifier("default")),
                [j.callExpression(j.identifier("createId"), [])]
              );
            }
          });
        });
    }
  });

  return root.toSource({ quote: "single" });
};
