import React from "react";
import T from "prop-types";
import { IconButton } from "@chakra-ui/core";
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

export const ToolbarButton = ({ isBlock, isActive, format, onClick }) => (
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
