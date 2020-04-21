import React from "react";
import T from "prop-types";
import { Box, Text, Icon, Flex } from "@chakra-ui/core";

export const NeutralAlert = ({ text, children }) => (
  <Flex
    direction="row"
    backgroundColor="#FAFAFA"
    maxWidth="678px"
    marginX="auto"
    paddingY="4"
    paddingX="8"
    border="1px"
    borderColor="gray.300"
    borderRadius="md"
  >
    <Box marginRight="4">
      <Icon size="24px" name="info-outline" />
    </Box>
    <Box>
      {text ? <Text fontSize="md">{text}</Text> : null}
      {children ? { children } : null}
    </Box>
  </Flex>
);

NeutralAlert.propTypes = {
  text: T.string,
  children: T.node,
};

NeutralAlert.defaultProps = {
  text: "",
  children: null,
};

export const RedAlert1 = ({ text, children }) => (
  <Box paddingX="4">
    <Box
      paddingX="3"
      paddingY="2"
      backgroundColor="rgb(255, 240, 203)"
      border="1px"
      borderColor="rgb(255, 204, 121)"
      borderRadius="sm"
    >
      {text ? <Text fontSize="sm">{text}</Text> : null}
      {children ? { children } : null}
    </Box>
  </Box>
);

RedAlert1.propTypes = {
  text: T.string,
  children: T.node,
};

RedAlert1.defaultProps = {
  text: "",
  children: null,
};
