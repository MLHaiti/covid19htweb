import React, { useEffect, useState, Fragment } from "react";
import { Box, Flex } from "@chakra-ui/core";

import { H1, H2, H3, H4 } from "components/article/heading";
import { Ol, Ul, Li } from "components/article/lists";
import {
  Quote,
  Alink,
  Paragraph,
  Bold,
  Code,
  Italic,
  Mark,
  Underline,
} from "components/article/misc";
import { Image } from "components/article/media";

const addMark = (value, _content) => {
  let content = _content;
  if (value.bold) {
    content = <Bold>{content}</Bold>;
  }

  if (value.italic) {
    content = <Italic>{content}</Italic>;
  }

  if (value.underline) {
    content = <Underline>{content}</Underline>;
  }

  if (value.code) {
    content = <Code>{content}</Code>;
  }

  if (value.mark) {
    content = <Mark>{content}</Mark>;
  }

  return content;
};

const renderList = (value, position) => {
  const { children } = value;
  return null;
};

const renderLeaf = (value, position) =>
  value.children.map((c, i) => {
    const Wrapper = Fragment;
    const { text } = c;

    if (text) {
      return <Wrapper key={`${position}-${i}`}>{addMark(c, text)}</Wrapper>;
    }

    // we have no text key so I
    return renderNode(c, `${position}-${i}`);
  });

const renderNode = (value, position) => {
  const { type } = value;
  const key = `node-${position}`;

  switch (type) {
    case "title":
      return <H1 key={key}>{renderLeaf(value, key)}</H1>;
    case "heading-two":
      return <H2 key={key}>{renderLeaf(value, key)}</H2>;
    case "heading-three":
      return <H3 key={key}>{renderLeaf(value, key)}</H3>;
    case "heading-four":
      return <H4 key={key}>{renderLeaf(value, key)}</H4>;
    case "quote":
      return <Quote key={key}>{renderLeaf(value, key)}</Quote>;
    case "bulleted-list":
      return <Ul key={key}>{renderLeaf(value, key)}</Ul>;
    case "numbered-list":
      return <Ol key={key}>{renderLeaf(value, key)}</Ol>;
    case "list-item":
      return <Li key={key}>{renderLeaf(value, key)}</Li>;
    case "image":
      return (
        <Flex key={key} width="full" direction="row" justifyContent="center">
          <Image src={value.url} />
        </Flex>
      );
    case "link":
      return (
        <Alink key={key} url={value.url}>
          {renderLeaf(value, key)}
        </Alink>
      );
    case "paragraph":
      // Handle the empty paragraph here
      if (value.children.length === 1 && value.children[0].text === "") {
        return <Paragraph key={key}>{"\u00a0"}</Paragraph>;
      }
      return <Paragraph key={key}>{renderLeaf(value, key)}</Paragraph>;
    default:
      return null;
  }
};

export const ArticleView = () => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const _value = window.localStorage.getItem("draftArticle");
    if (_value) {
      setValue(JSON.parse(_value));
    }
  }, []);

  if (!value) {
    return null;
  }

  return (
    <Box>
      <Box>Great</Box>
      <H1>Emma</H1>
      {value.map((v, i) => {
        {
          /* console.log(v); */
        }
        return renderNode(v, i);
      })}
    </Box>
  );
};
