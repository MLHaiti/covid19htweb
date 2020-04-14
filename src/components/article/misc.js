import React, { forwardRef } from "react";
import { Box, Text, Link } from "@chakra-ui/core";

export const El = forwardRef(({ children, ...props }, ref) => (
  <Box {...props} ref={ref}>
    {children}
  </Box>
));

export const Quote = forwardRef(({ children, ...props }, ref) => (
  <Box as="blockquote" {...props} ref={ref}>
    {children}
  </Box>
));

// TODO Improvement needed handle differently local and external link
export const Alink = forwardRef(
  ({ children, url, isLive = false, ...props }, ref) => (
    // <Box as="a" href={url} {...props} ref={ref}>
    //   {children}
    // </Box>
    <Link href={url} {...props} ref={ref} isExternal>
      {children}
    </Link>
  )
);

export const Paragraph = forwardRef(({ children, ...props }, ref) => (
  <Text {...props} ref={ref}>
    {children}
  </Text>
));

export const Bold = forwardRef(({ children, ...props }, ref) => (
  <Box as="strong" {...props} ref={ref}>
    {children}
  </Box>
));

export const Code = forwardRef(({ children, ...props }, ref) => (
  <Box as="code" {...props} ref={ref}>
    {children}
  </Box>
));

export const Italic = forwardRef(({ children, ...props }, ref) => (
  <Box as="em" {...props} ref={ref}>
    {children}
  </Box>
));

export const Underline = forwardRef(({ children, ...props }, ref) => (
  <Box as="u" {...props} ref={ref}>
    {children}
  </Box>
));

export const Mark = forwardRef(({ children, ...props }, ref) => (
  <Box as="mark" {...props} ref={ref}>
    {children}
  </Box>
));
