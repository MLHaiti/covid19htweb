import React from "react";
import { Box, Text } from "@chakra-ui/core";

export const El = React.forwardRef(({ children, ...props }, ref) => (
  <Box {...props} ref={ref}>
    {children}
  </Box>
));

export const Quote = React.forwardRef(({ children, ...props }, ref) => (
  <Box as="blockquote" {...props} ref={ref}>
    {children}
  </Box>
));

// TODO Improvement needed
export const Alink = React.forwardRef(({ children, ...props }, ref) => (
  <Box as="a" {...props} ref={ref}>
    {children}
  </Box>
));

export const Paragraph = React.forwardRef(({ children, ...props }, ref) => (
  <Text {...props} ref={ref}>
    {children}
  </Text>
));
