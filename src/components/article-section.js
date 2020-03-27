import React from "react";
import T from "prop-types";
import { Box } from "@chakra-ui/core";

export const ArticleSection = ({ children, ...rest }) => (
  <Box as="section" {...rest}>
    {children}
  </Box>
);

ArticleSection.propTypes = {
  children: T.node.isRequired,
};
