import React from "react";
import { Box, Heading } from "@chakra-ui/core";

export const Layout = ({ children }) => (
  <Box marginX="auto" maxWidth="960px">
    <Heading as="h1" size="xl" textAlign="center">
      codvid19ht
    </Heading>
    {children}
  </Box>
);
