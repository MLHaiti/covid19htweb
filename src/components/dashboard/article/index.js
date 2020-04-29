import React, { useState } from "react";
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

export default function ArticleView() {
  const [mode, setMode] = useState("active"); // passive or active
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  const [content, setContent] = useState({});

  const onScroll = () => {
    const { scrollTop } = document.getElementById("drawer-article-editor-body");
    mutate("articleEditorScrollTop", { scrollTop });
  };

  return (
    <Box
      width="full"
      mt="4"
      paddingX="4"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Stack width="500px" border="1px" borderColor="gray.200" padding="4">
        <Button
          onClick={() => {
            setContent({ content: [] });
            onOpen();
          }}
          variantColor="green"
          isDisabled={isOpen}
        >
          kreye yon atik
        </Button>
      </Stack>
      {mode === "active" ? (
        <Drawer
          onClose={onClose}
          isOpen={isOpen}
          size="70%"
          scrollBehavior="inside"
          id="article-editor"
          // closeOnEsc={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody onScroll={onScroll}>
              <Stack width="710px" borderRadius="md">
                <ArticleCompositor article={content} onClose={onClose} />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : null}
    </Box>
  );
}
