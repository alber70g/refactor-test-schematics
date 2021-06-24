import {
  FileVisitor,
  Rule,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";
import ts = require("typescript");

export function sensesUpgrades(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const fileVisitor: FileVisitor = (path, entry) => {
      if (path.endsWith(".iets.ts") && entry && entry.content) {
        const updater = tree.beginUpdate(path);

        const sourceFile = ts.createSourceFile(
          path,
          (tree.read(path) as Buffer).toString("utf8"),
          ts.ScriptTarget.Latest,
          true
        );

        sourceFile.forEachChild(function visitor(node) {
          if (
            node &&
            ts.isVariableDeclaration(node) &&
            node.getFullText().includes("haha")
          ) {
            node.forEachChild(function childVisitor(node) {
              if (node && ts.isStringLiteral(node)) {
                updater.remove(node.getStart(), node.getWidth());
                updater.insertLeft(node.getStart(), "'world'");
              }
              node.forEachChild(childVisitor);
            });
          }
          node.forEachChild(visitor);
        });

        tree.commitUpdate(updater);
      }
    };

    tree.visit(fileVisitor);

    return tree;
  };
}

export const getTypeScriptSourceFile = (host: Tree, path: string) =>
  ts.createSourceFile(
    path,
    readFile(path)(host).toString("utf8"),
    ts.ScriptTarget.Latest,
    true
  );

export const readFile =
  (path: string) =>
  (tree: Tree): Buffer => {
    if (!tree.exists(path)) {
      throw new Error(`Could not find file '${path}'`);
    }
    return tree.read(path) as Buffer;
  };
