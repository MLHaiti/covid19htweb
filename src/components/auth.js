import React from "react";

import { Flex, Box } from "@chakra-ui/core";

export const AuthLayout = ({ children }) => (
  <Flex
    zIndex={99999}
    width="100vw"
    height="100vh"
    direction="column"
    justifyContent="center"
    alignItems="center"
    // paddingX="6"
  >
    {children}
  </Flex>
);
