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
  const [article, setArticle] = useState({
    content: [{ type: "paragraph", children: [{ text: "" }] }],
  });
  const [mode, setMode] = useState("active"); // passive or active
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const [content, setContent] = useState({});

  const onScroll = () => {
    const { scrollTop } = document.getElementById("drawer-article-editor-body");
    mutate("articleEditorScrollTop", { scrollTop });
  };

  useEffect(() => () => mutate("articleEditorScrollTop", { scrollTop: 0 }), []);

  return (
    <Box paddingY="8" paddingX="16">
      <Box marginBottom="16">
        <Button variantColor="green" isDisabled={isOpen} onClick={onOpen}>
          Kreye yon nouvo atik
        </Button>
      </Box>
      <ArticleTable />
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size="85%"
        scrollBehavior="inside"
        id="article-editor"
        blockScrollOnMount

        // closeOnEsc={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody onScroll={onScroll}>
            <ArticleCompositor
              article={article}
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
