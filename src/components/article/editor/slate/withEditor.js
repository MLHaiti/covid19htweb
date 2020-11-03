/* eslint-disable no-restricted-syntax */
import { Transforms, Editor, Point, Node } from "slate";
import flowRight from "lodash.flowright";
import { PARAGRAPH_ON_BREAK, isCollapsed, LIST_TYPES } from "./helpers";

const withGeneral = (editor) => {
  const { insertBreak } = editor;

  editor.insertBreak = (...args) => {
    const { selection } = editor;

    if (isCollapsed(selection)) {
      const {
        anchor: { path, offset },
      } = selection;
      const node = editor.children[path[0]];

      const { length } = Node.string(node);
      const firstOrLast = offset === 0 || offset === length;

      const needParagraph =
        firstOrLast && PARAGRAPH_ON_BREAK.includes(node.type);

      if (needParagraph) {
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "" }],
        });
        return;
      }
    }
    insertBreak(...args);
  };

  return editor;
};

const withList = (editor) => {
  const { insertBreak, normalizeNode } = editor;

  editor.insertBreak = (...args) => {
    const { selection } = editor;

    if (isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "list_item",
      });

      if (match) {
        const start = Editor.start(editor, match[1]);
        if (Point.equals(selection.anchor, start)) {
          const {
            anchor: { path },
          } = selection;
          const descendant = Node.get(editor, path);
          if (descendant.text) {
            return insertBreak(...args);
          }

          const [matchList] = Editor.nodes(editor, {
            match: (n) => LIST_TYPES.includes(n.type),
          });

          if (matchList) {
            const newNode = {
              kind: "block",
              type: "paragraph",
              children: [{ text: "" }],
            };
            editor.deleteBackward("character");
            Transforms.insertNodes(editor, newNode, {
              match: (n) => LIST_TYPES.includes(n.type),
              // mode: "highest",
            });
            return;
          }
        }
      }
    }
    insertBreak(...args);
  };

  editor.normalizeNode = ([node, path]) => {
    if (LIST_TYPES.includes(node.type)) {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (child.type !== "list_item") {
          Transforms.setNodes(editor, { type: "list_item" }, { at: childPath });
        }
      }
    }

    if (node.type === "list_item") {
      const parent = Node.parent(editor, path);

      if (!LIST_TYPES.includes(parent.type)) {
        Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
      }
    }

    normalizeNode([node, path]);
  };

  return editor;
};

export const withEditor = flowRight([withList, withGeneral]);
