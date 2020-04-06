import React from "react";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  // DrawerCloseButton,
} from "@chakra-ui/core";
import { MdMenu } from "react-icons/md";

import { TopMenu } from "./top-menu";
import { SideMenu } from "./side-menu";

const WrappedMenu = (props) => (
  <Box
    backgroundColor="rgb(51, 51, 51)"
    width="202px"
    minHeight="full"
    position="fixed"
    zIndex={2}
    marginTop="50px"
    tabIndex={-1}
    // display={{ base: "none", lg: "block" }}
    {...props}
  >
    <SideMenu />
  </Box>
);

export const DashboardLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TopMenu
        onMenuClick={() => {
          isOpen ? onClose() : onOpen();
        }}
        isOpen={isOpen}
      />

      <Flex direction="row" minHeight="full" backgroundColor="#ffffff">
        <Drawer size={202} isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody padding={0}>
              <WrappedMenu />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <WrappedMenu display={{ base: "none", lg: "block" }} />

        <Box
          minHeight="full"
          width="100%"
          marginTop="50px"
          marginLeft={{ base: 0, lg: "202px" }}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};
