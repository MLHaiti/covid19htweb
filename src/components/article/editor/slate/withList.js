import { Transforms, Editor, Range, Element, Node } from "slate";
import { PARAGRAPH_ON_BREAK, isCollapsed } from "./helpers";

/**
 *
 * "children", "operations", "selection", "marks", "isInline", "isVoid", "onChange", "apply", "addMark",
 * "deleteBackward", "deleteForward", "deleteFragment", "getFragment", "insertBreak", "insertFragment",
 * "insertNode", "insertText", "normalizeNode", "removeMark", "setFragmentData", "insertData", "history",
 * "redo", "undo"
 */

export const withList = (editor) => {
  // console.log(editor);
  const { normalizeNode, insertBreak } = editor;

  // editor.deleteBackward = (options) => {
  //   console.log("back ", options);
  //   deleteBackward(options);
  // };

  // editor.deleteFragment = () => {
  //   console.log("fragment");
  //   deleteFragment();
  // };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (isCollapsed(selection)) {
      const {
        anchor: { path, offset },
      } = selection;
      const node = editor.children[path[0]];

      const { length } = Node.string(node);
      const firstOrLast = offset === 0 || offset === length;

      console.log(length, firstOrLast);

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

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    return normalizeNode(entry);
  };

  return editor;
};
