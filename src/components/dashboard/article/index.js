import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
} from "@chakra-ui/core";
import { mutate } from "swr";
import { ArticleCompositor } from "./article-compositor";

import { ArticleTable } from "./article-table";

export default function ArticleView() {
  const [articleInfo, setArticleInfo] = useState({});
  const [mode, setMode] = useState("active"); // passive or active
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const [content, setContent] = useState({});

  const onScroll = () => {
    const { scrollTop } = document.getElementById("drawer-article-editor-body");
    mutate("articleEditorScrollTop", { scrollTop });
  };

  useEffect(() => () => mutate("articleEditorScrollTop", { scrollTop: 0 }), []);

  const onRowClick = (row) => {
    const { original } = row;
    onOpen();
    setArticleInfo(original);
  };

  return (
    <Box paddingY="8" paddingX="16">
      <Box marginBottom="16">
        <Button
          variantColor="green"
          isDisabled={isOpen}
          onClick={() => {
            onOpen();
            setArticleInfo({});
          }}
        >
          Kreye yon nouvo atik.
        </Button>
      </Box>
      <ArticleTable onRowClick={onRowClick} />
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size="85%"
        scrollBehavior="inside"
        id="article-editor"
        closeOnEsc={false}
        blockScrollOnMount
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody onScroll={onScroll}>
            <ArticleCompositor
              key={articleInfo.id}
              articleInfo={articleInfo}
              onComplete={() => {
                console.log("complete");
                onClose();
              }}
              autoSave={() => {}}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
