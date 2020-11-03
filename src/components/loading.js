import React from "react";
import { Box, Spinner, Flex, Heading } from "@chakra-ui/core";
import { Grid } from "components/spinners";

export const PageSpinner = () => (
  <Flex
    zIndex={99999}
    width="100vw"
    height="50vh"
    justifyContent="center"
    alignItems="center"
  >
    <Flex flexDirection="column" alignItems="center">
      <Grid />
      <Heading marginTop="8" as="h4" fontSize="sm">
        Loading
      </Heading>
    </Flex>
  </Flex>
);

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
