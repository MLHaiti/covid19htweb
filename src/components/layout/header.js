import React from "react";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  CloseButton,
} from "@chakra-ui/core";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = () => {
    console.log("click");
  };
  return (
    <>
      <Flex
        flexDirection="row"
        marginX="auto"
        maxWidth="960px"
        justifyContent="space-between"
        width="100%"
        padding="16px"
      >
        <Box>Santepam</Box>
        <Button variantColor="teal" variant="link" onClick={onOpen}>
          Meni
        </Button>
      </Flex>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            flexDirection="row"
          >
            <Box
              as="span"
              fontSize="md"
              display="inline-block"
              marginRight="auto"
            >
              Meni Prensipal
            </Box>
            <CloseButton onClick={onClose} />
            {/* <Button
              variantColor="teal"
              variant="link"
              fontSize="sm"
              onClick={onClose}
            >
              Fèmen
            </Button> */}
          </DrawerHeader>
          <DrawerBody>
            <TopMenu close={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const TopMenu = ({ close }) => (
  <div>
    <Flex direction="row" justifyContent="center" marginY="4">
      {/* <Button variantColor="teal" variant="link" fontSize="md" onClick={close}>
        Fèmen
      </Button> */}
      <CloseButton onClick={close} />
    </Flex>
  </div>
);
