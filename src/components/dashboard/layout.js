import React from "react";
import { Box } from "@chakra-ui/core";

import { SideMenu } from "./side-menu";

export const WrappedMenu = (props) => (
  <Box
    backgroundColor="rgb(51, 51, 51)"
    width="202px"
    minHeight="full"
    position="fixed"
    zIndex={2}
    // marginTop="50px"/
    tabIndex={-1}
    // display={{ base: "none", lg: "block" }}
    {...props}
  >
    <SideMenu />
  </Box>
);
