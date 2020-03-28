import React from "react";
import { Box, Spinner, Flex } from "@chakra-ui/core";

export const FullPageLoading = () => (
  <Flex
    zIndex={99999}
    width="100vw"
    height="100vh"
    justifyContent="center"
    alignItems="center"
  >
    <Box>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Box as="p" mt="2" color="gray.500" fontSize="lg">
        Loading...
      </Box>
    </Box>
  </Flex>
);

export const FullLoading = () => (
  <Flex width="full" height="full" justifyContent="center" alignItems="center">
    <Box>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Loading..."
      />
    </Box>
  </Flex>
);
