import React from "react";
import { Box } from "@chakra-ui/core";

export const Ul = React.forwardRef(({ children, ...props }, ref) => (
  <Box as="ul" {...props} ref={ref}>
    {children}
  </Box>
));

export const Ol = React.forwardRef(({ children, ...props }, ref) => (
  <Box as="ol" {...props} ref={ref}>
    {children}
  </Box>
));

export const Li = React.forwardRef(({ children, ...props }, ref) => (
  <Box as="li" {...props} ref={ref}>
    {children}
  </Box>
));
