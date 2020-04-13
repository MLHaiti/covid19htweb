import React from "react";
import { Flex, Box, IconButton } from "@chakra-ui/core";
import { MdMenu } from "react-icons/md";

export const TopMenu = ({ onMenuClick, isOpen }) => (
  <Flex
    backgroundColor="#274FED" // "#3930D8"
    paddingX="16px"
    height="50px"
    width="100%"
    position="fixed"
    zIndex={1200}
    flexDirection="row"
    justifyContent="flex-start"
    alignItems="center"
  >
    <Box display={{ lg: "none" }}>
      {isOpen ? (
        <IconButton
          color="white"
          icon="close"
          size={28}
          aria-label="Close side menu"
          onClick={onMenuClick}
          backgroundColor="#274FED"
        />
      ) : (
        <Box
          color="white"
          as={MdMenu}
          size={28}
          aria-label="Open side menu"
          onClick={onMenuClick}
        />
      )}
    </Box>
  </Flex>
);
