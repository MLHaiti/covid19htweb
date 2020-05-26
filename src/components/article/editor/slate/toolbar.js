import React, { useCallback, useRef, useEffect } from "react";
import { useSlate } from "slate-react";
import { Box, Flex } from "@chakra-ui/core";
import { mutate } from "swr";
import {
  isBlockActive,
  toggleBlock,
  isMarkActive,
  toggleMark,
} from "./helpers";
import { ToolbarButton } from "./toolbar-button";
import { useScrollTop } from "./hook";

const Group = ({ children }) => <Box marginRight="4">{children}</Box>;

export const Toolbar = () => {
  const barInfo = useRef({ top: 0, width: 676, height: 57 });
  const editor = useSlate();
  const { scrollTop } = useScrollTop();
  const fixed = scrollTop > barInfo.current.top;

  useEffect(() => {
    const size = (el) => el.getBoundingClientRect();
    const toolbar = size(document.getElementById("article-editor-toolbar"));
    const { top, height, left, width } = toolbar;

    barInfo.current = { top, height, left, width };
    return () => {
      mutate("articleEditorToolbarPosition", { height: 0, top: 0 });
      mutate("articleEditorScrollTop", { scrollTop: 0 });
    };
  }, []);

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
    <>
      <Box
        height={`${barInfo.current.height}px`}
        width={`${barInfo.current.width}px`}
        display={fixed ? "block" : "none"}
      />
      <Flex
        position={fixed ? "fixed" : "static"}
        top={0}
        width="full"
        padding="4"
        backgroundColor="#ffffff"
        direction="row"
        transition="all 0.2s"
        // justifyContent="center"

        marginBottom="8"
        id="article-editor-toolbar"
      >
        <Group>
          <ToolbarButton
            format="title_two"
            onClick={onClick}
            isActive={isBlockActive(editor, "title_two")}
          />
          <ToolbarButton
            format="title_three"
            onClick={onClick}
            isActive={isBlockActive(editor, "title_three")}
          />
          <ToolbarButton
            format="title_four"
            onClick={onClick}
            isActive={isBlockActive(editor, "title_four")}
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
            format="ol_list"
            onClick={onClick}
            isActive={isBlockActive(editor, "ol_list")}
          />
          <ToolbarButton
            format="ul_list"
            onClick={onClick}
            isActive={isBlockActive(editor, "ul_list")}
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
    </>
  );
};
