import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  CloseButton,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/core";
import { FullDiv } from "components/brics";
import { ArticleCompositor } from "./article-compositor";

export default function ArticleView() {
  const { isOpen, onOpen, onClose } = useDisclosure(true);

  const [content, setContent] = useState({});
  const [ready, setReady] = useState(false);
  const length = 0;

  return (
    <>
      <FullDiv mt="4">
        <Box marginY="12" marginX="auto" maxWidth="732px">
          <Heading as="h1" fontSize="2xl" marginBottom="8">
            Lis Atik yo.
          </Heading>

          <Button
            onClick={() => {
              setContent({ content: [] });
              onOpen();
            }}
            variantColor="green"
          >
            kreye yon atik
          </Button>

          {length === 0 ? <Text fontSize="lg">Ou poko gen atik</Text> : null}
        </Box>
      </FullDiv>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        isFullHeight
        closeOnEsc={false}
        scrollBehavior="inside"
        // finalFocusRef={btnRef}
      >
        {/* <DrawerOverlay /> */}
        <DrawerContent>
          <DrawerBody>
            <ArticleCompositor article={content} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
