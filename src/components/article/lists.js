import React from "react";
import { Box, List, ListItem } from "@chakra-ui/core";

export const Ul = React.forwardRef(({ children, ...props }, ref) => (
  <List
    as="ul"
    styleType="disc"
    paddingLeft="4"
    marginTop="2"
    marginBottom="4"
    {...props}
    ref={ref}
  >
    {children}
  </List>
));

export const Ol = React.forwardRef(({ children, ...props }, ref) => (
  <List
    as="ol"
    styleType="decimal"
    paddingLeft="4"
    marginTop="2"
    marginBottom="4"
    {...props}
    ref={ref}
  >
    {children}
  </List>
));

export const Li = React.forwardRef(({ children, ...props }, ref) => (
  <ListItem {...props} ref={ref}>
    {children}
  </ListItem>
));
