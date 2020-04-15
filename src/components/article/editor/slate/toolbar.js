import React, { useCallback } from "react";
import T from "prop-types";
import { useSelected, useFocused, useSlate } from "slate-react";
import { Box, Button, IconButton, Flex } from "@chakra-ui/core";
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

/**
 * isBlock - onClick - Icon- format
 * toggle
 */

const ToolbarButton = ({ isBlock, isActive, format, onClick }) => (
  <IconButton
    // variant={isActive ? "solid" : "ghost"}
    // variantColor="blue"
    variant="link"
    color={isActive ? "blue.400" : "black"}
    fontSize="24px"
    aria-label="Editor Icon"
    icon={iconMap[format]}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(isBlock, format);
    }}
  />
);

ToolbarButton.propTypes = {
  isBlock: T.bool,
  format: T.string.isRequired,
  onClick: T.func.isRequired,
  isActive: T.bool.isRequired,
};
ToolbarButton.defaultProps = {
  isBlock: true,
};

const Group = ({ children }) => <Box marginRight="4">{children}</Box>;

export const Toolbar = () => {
  const editor = useSlate();

  const onClick = useCallback(
    (isBlock, format) => {
      if (isBlock) {
        toggleBlock(editor, format);
      } else {
        toggleMark(editor, format);
      }
    },
    [editor]
  );

  return (
    <Flex
      padding="4"
      backgroundColor="#ffffff"
      direction="row"
      // justifyContent="center"
      marginBottom="8"
    >
      <Group>
        <ToolbarButton
          format="heading-two"
          onClick={onClick}
          isActive={isBlockActive(editor, "heading-two")}
        />
        <ToolbarButton
          format="heading-three"
          onClick={onClick}
          isActive={isBlockActive(editor, "heading-three")}
        />
        <ToolbarButton
          format="heading-four"
          onClick={onClick}
          isActive={isBlockActive(editor, "heading-four")}
        />
      </Group>
      <Group>
        <ToolbarButton
          isBlock={false}
          format="bold"
          onClick={onClick}
          isActive={isMarkActive(editor, "bold")}
        />
        <ToolbarButton
          isBlock={false}
          format="italic"
          onClick={onClick}
          isActive={isMarkActive(editor, "italic")}
        />
        <ToolbarButton
          isBlock={false}
          format="underline"
          onClick={onClick}
          isActive={isMarkActive(editor, "underline")}
        />
        <ToolbarButton
          isBlock={false}
          format="align-center"
          onClick={onClick}
          isActive={isMarkActive(editor, "align-center")}
        />
      </Group>

      <Group>
        <ToolbarButton
          format="numbered-list"
          onClick={onClick}
          isActive={isBlockActive(editor, "numbered-list")}
        />
        <ToolbarButton
          format="bulleted-list"
          onClick={onClick}
          isActive={isBlockActive(editor, "bulleted-list")}
        />
        <ToolbarButton
          format="block-quote"
          onClick={onClick}
          isActive={isBlockActive(editor, "block-quote")}
        />
      </Group>
      {/* <LinkButton />
      <ImageButton /> */}
      <ToolbarButton
        isBlock={false}
        format="mark"
        onClick={onClick}
        isActive={isMarkActive(editor, "mark")}
      />
    </Flex>
  );
};
