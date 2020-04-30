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
  "numbered-list": MdFormatListNumbered,
  "bulleted-list": MdFormatListBulleted,
  "heading-one": MdLooksOne,
  "heading-two": MdLooksTwo,
  "heading-three": MdLooks3,
  "heading-four": MdLooks4,
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
  "heading-two",
  "heading-three",
  "heading-four",
  "quote",
  "image",
  "video",
];

const LIST_TYPES = ["numbered-list", "bulleted-list"];

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

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

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
  // const { selection } = editor;
  // const collapsed = isCollapsed(selection);

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
