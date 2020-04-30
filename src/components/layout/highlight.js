import React from "react";
import { Box, Flex } from "@chakra-ui/core";

export const PrimaryHighlight = () => (
  <Flex
    direction="row"
    alignItems="center"
    width="200px"
    height="200px"
    transition="all .2s ease"
    borderRadius="md"
  >
    <Box>Ok</Box>
  </Flex>
);
