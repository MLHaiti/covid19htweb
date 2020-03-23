import React from "react";
import { Box } from "@chakra-ui/core";

export const Ul = ({ children, ...rest }) => (
  <Box as="ul" paddingLeft="1em" {...rest}>
    {children}
  </Box>
);

export const Ol = ({ children, ...rest }) => (
  <Box as="ol" paddingLeft="1em" {...rest}>
    {children}
  </Box>
);
