/* eslint-disable */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { Box } from "@chakra-ui/core";
import {Node} from 'slate'
import { useSelected, useFocused } from "slate-react";

import {H1,H2, H3, H4, Ol, Ul, Li, Quote, Alink, Paragraph} from 'components/article'
import {Image} from  'components/article/media'

export const element = (props) => {
  const { attributes={}, children, element } = props;
  // console.log(element);
  switch (element.type) {

    case "title":
      return  <H1 {...attributes}>{children}</H1>
    case "heading-two":
      return  <H2 {...attributes}>{children}</H2>
    case "heading-three":
        return <H3 {...attributes}>{children}</H3>
    case "heading-four":
      return  <H4 {...attributes}>{children}</H4>
    case "quote":
        return <Quote {...attributes}>{children}</Quote>;
    case "bulleted-list":
        return <Ul {...attributes} >{children}</Ul>
    case "numbered-list":
      return <Ol {...attributes}>{children}</Ol>
    case "list-item":
        return <Li {...attributes}>{children}</Li>;
    case "image":
      return <ImageElement {...props} />;
    case "link":
      return (
        <Alink {...attributes} href={element.url}>
          {children}
        </Alink>
      );
    case "paragraph":
    default:
      return <Paragraph  {...attributes}>{children}</Paragraph>;
  }
};

export const leaf = ({ attributes={}, children, leaf }) => {
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
    _children = <mark >{children}</mark>;
  }
  return <span {...attributes}>{_children}</span>;
};

export const ImageElement = ({ attributes, children, element }) => {
  return (
    <Box width="full" {...attributes}> 
      <div contentEditable={false}>
      <Image 
        src={element.url}          
        />

      </div>
      {children}
    </Box>
  );
};
