/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelected, useFocused, useSlate } from "slate-react";
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
  MdImage,
  MdInsertLink,
  MdBrush,
} from "react-icons/md";

import { Button, Toolbar } from "./basics";

import {
  isBlockActive,
  toggleBlock,
  isMarkActive,
  toggleMark,
  insertImage,
  isLinkActive,
  insertLink,
  removeLink,
} from "./helpers";

const iconMap = {
  bold: MdFormatBold,
  italic: MdFormatItalic,
  underline: MdFormatUnderlined,
  code: MdCode,
  "block-quote": MdFormatQuote,
  ol_list: MdFormatListNumbered,
  ul_list: MdFormatListBulleted,
  "heading-one": MdLooksOne,
  title_two: MdLooksTwo,
  title_three: MdLooks3,
  image: MdImage,
  link: MdInsertLink,
  mark: MdBrush,
};

/**
 * -------------------------------------------------------------
 */

export const BlockButton = ({ format }) => {
  const editor = useSlate();
  const Icon = iconMap[format];
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon size={18} />
    </Button>
  );
};

export const MarkButton = ({ format }) => {
  const editor = useSlate();
  const Icon = iconMap[format];
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon size={18} />
    </Button>
  );
};

export const LinkButton = () => {
  const editor = useSlate();
  const Icon = iconMap.link;
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        // we will remove link before
        if (isLinkActive(editor)) {
          removeLink(editor);
        } else {
          const url = window.prompt("Enter the URL of the link:");
          if (!url) return;
          insertLink(editor, url);
        }
      }}
    >
      <Icon size={18} />
    </Button>
  );
};

export const ImageButton = () => {
  const editor = useSlate();
  const Icon = iconMap.image;
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image:");
        if (!url) return;

        insertImage(editor, url);
      }}
    >
      <Icon size={18} />
    </Button>
  );
};

export const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "ul_list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "title_two":
      return <h2 {...attributes}>{children}</h2>;
    case "list_item":
      return <li {...attributes}>{children}</li>;
    case "ol_list":
      return <ol {...attributes}>{children}</ol>;
    case "image":
      return <ImageElement {...props} />;
    case "link":
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }) => {
  let _children = children;
  if (leaf.bold) {
    _children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    _children = <code>{children}</code>;
  }

  if (leaf.italic) {
    _children = <em>{children}</em>;
  }

  if (leaf.underline) {
    _children = <u>{children}</u>;
  }

  if (leaf.mark) {
    _children = <mark>{children}</mark>;
  }
  return <span {...attributes}>{_children}</span>;
};

export const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          alt="an article image"
          css={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"};
          `}
        />
      </div>
      {children}
    </div>
  );
};
