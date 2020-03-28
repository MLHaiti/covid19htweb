import React, { useRef, useEffect } from "react";
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

import { SideMenu } from "./side-menu";

export const DashboardLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        backgroundColor="rgb(34, 167, 240)"
        paddingX="16px"
        height="50px"
        width="100%"
        position="fixed"
        zIndex={1401}
      >
        <Box
          as={MdMenu}
          size={28}
          aria-label="Open side menu"
          onClick={onOpen}
        />
      </Box>
      <Flex direction="row" minHeight="full">
        <Drawer size={202} isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Box marginTop="50px" />
              <SideMenu />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Box
          className="wew"
          backgroundColor="white"
          width="202px"
          minHeight="full"
          paddingX="16px"
          position="fixed"
          zIndex={2}
          marginTop="50px"
          tabIndex={-1}
        >
          <SideMenu />
        </Box>
        <Box
          backgroundColor="rgb(241, 243, 244)"
          display="flex"
          minHeight="full"
          width="100%"
          marginTop="50px"
          marginLeft={{ base: 0, lg: "202px" }}
          paddingX={{ base: 4, lg: 8 }}
          paddingY={{ base: 4 }}
          // paddingY={{ base: 20 }}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};
