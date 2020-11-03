import { Editor, Transforms, Range, Node } from "slate";
import isHotkey from "is-hotkey";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
  MdLooks4,
  MdImage,
  MdInsertLink,
  MdBrush,
  MdFormatAlignCenter,
  MdFormatAlignLeft,
} from "react-icons/md";

export const iconMap = {
  bold: MdFormatBold,
  italic: MdFormatItalic,
  underline: MdFormatUnderlined,
  code: MdCode,
  quote: MdFormatQuote,
  ol_list: MdFormatListNumbered,
  ul_list: MdFormatListBulleted,
  "heading-one": MdLooksOne,
  title_two: MdLooksTwo,
  title_three: MdLooks3,
  title_four: MdLooks4,
  image: MdImage,
  link: MdInsertLink,
  mark: MdBrush,
  "align-left": MdFormatAlignLeft,
  "align-center": MdFormatAlignCenter,
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const PARAGRAPH_ON_BREAK = [
  "title",
  "title_two",
  "title_three",
  "title_four",
  "quote",
  "image",
  "video",
];

export const LIST_TYPES = ["ol_list", "ul_list"];

export const isCollapsed = (selection) => Range.isCollapsed(selection);

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  if (isActive) {
    Transforms.setNodes(editor, {
      type: "paragraph",
    });
  } else {
    Transforms.setNodes(editor, {
      type: isList ? "list_item" : format,
    });
  }

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const handleHotKeys = (event, editor) => {
  Object.entries(HOTKEYS).forEach((el) => {
    if (isHotkey(el[0], event)) {
      event.preventDefault();
      toggleMark(editor, el[1]);
    }
  });
};
