import { Editor, Transforms, Range } from "slate";
import imageExtensions from "image-extensions";
import isHotkey from "is-hotkey";
import isUrl from "is-url";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["ol_list", "ul_list"];

const isCollapsed = (selection) => selection && Range.isCollapsed(selection);

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
    type: isActive ? "paragraph" : isList ? "list_item" : format,
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

export const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

export const handleHotKeys = (editor) => (event) => {
  Object.entries(HOTKEYS).forEach((el) => {
    if (isHotkey(el[0], event)) {
      event.preventDefault();
      toggleMark(editor, el[1]);
    }
  });
};

export const insertBlock = (editor, params) => {
  switch (params.type) {
    case "image":
      insertImage(editor, params.url);
      break;
    default:
  }
};

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

export const withImages = (editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === "image" ? true : isVoid(element);

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      Object.entries(files).forEach((params) => {
        const [k, file] = params;
        if (k !== "length") {
          const reader = new FileReader();
          const [mime] = file.type.split("/");

          if (mime === "image") {
            reader.addEventListener("load", () => {
              const url = reader.result;
              insertImage(editor, url);
            });

            reader.readAsDataURL(file);
          }
        }
      });
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const unwrapLink = (editor) => {
  if (isLinkActive(editor)) {
    Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
  }
};

export const removeLink = unwrapLink;

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
    return;
  }

  const { selection } = editor;
  const collapsed = isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: collapsed ? [{ text: url }] : [],
  };

  if (collapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const insertLink = wrapLink;

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
};

export const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    element.type === "link" ? true : isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
