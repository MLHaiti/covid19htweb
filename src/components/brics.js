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

export const FullDiv = ({ children, ...props }) => (
  <Box width="full" {...props}>
    {children}
  </Box>
);

export const AugmentChildren = ({ children, ...props }) =>
  React.Children.map(children, (el) => React.cloneElement(el, props));
