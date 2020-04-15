import React from "react";
import { Box, Heading } from "@chakra-ui/core";

export const H1 = React.forwardRef(({ children, ...props }, ref) => (
  <Heading as="h1" {...props} ref={ref}>
    {children}
  </Heading>
));

export const H2 = React.forwardRef(({ children, ...props }, ref) => (
  <Heading as="h2" size="lg" {...props} ref={ref}>
    {children}
  </Heading>
));

export const H3 = React.forwardRef(({ children, ...props }, ref) => (
  <Heading as="h3" size="md" {...props} ref={ref}>
    {children}
  </Heading>
));

export const H4 = React.forwardRef(({ children, ...props }, ref) => (
  <Heading as="h4" size="sm" {...props} ref={ref}>
    {children}
  </Heading>
));

export const H5 = React.forwardRef(({ children, ...props }, ref) => (
  <Heading as="h5" {...props} ref={ref}>
    {children}
  </Heading>
));

export const H6 = React.forwardRef(({ children, ...props }, ref) => (
  <Heading as="h6" {...props} ref={ref}>
    {children}
  </Heading>
));
