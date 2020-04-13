import React from "react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Transforms } from "slate";

export const withImages = (editor) => {
  const { insertData, insertText, isVoid } = editor;

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
              Transforms.insertNodes(editor, {
                type: "paragraph",
                children: [{ text: "" }],
              });
            });

            reader.readAsDataURL(file);
          }
        }
      });
      // for (const file of files) {
      //   const reader = new FileReader();
      //   const [mime] = file.type.split("/");

      //   if (mime === "image") {
      //     reader.addEventListener("load", () => {
      //       const url = reader.result;
      //       insertImage(editor, url);
      //     });

      //     reader.readAsDataURL(file);
      //   }
      // }
    } else if (isImageUrl(text)) {
      console.log("url yes", text);
      insertImage(editor, text);
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      });
    } else {
      console.log("url no", text);
      insertData(data);
    }
  };

  return editor;
};

export const insertImage = (editor, url) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};
