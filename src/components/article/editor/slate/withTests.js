import { Transforms, Editor, Range, Element, Node } from "slate";

import { PARAGRAPH_ON_BREAK, isCollapsed } from "./helpers";

export const withTests = (editor) => {
  const { insertData, insertText, normalizeNode, isVoid, insertBreak } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (Element.isElement(node)) {
      // ensure that the default node is a paragraph
      if (!node.type) {
        Transforms.setNodes(
          editor,
          { type: "paragraph" },
          { at: path, match: (n) => Editor.isBlock(editor, n) }
        );
        return;
      }
    }

    // Fall back to the original `normalizeNode` to enforce other constraints.
    normalizeNode(entry);
  };

  editor.insertData = (data) => insertData(data);

  editor.insertText = (data) => insertText(data);

  editor.insertBreak = () => {
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
    insertBreak();

    // Transforms.splitNodes(editor, {
    //   always: true,
    // });
  };

  return editor;
};
