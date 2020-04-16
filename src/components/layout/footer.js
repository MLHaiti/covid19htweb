import React from "react";
import T from "prop-types";
import { Box } from "@chakra-ui/core";

export const Footer = ({ children }) => (
  <Box as="footer" marginX="auto" maxWidth="1080px">
    <Box width="full" marginTop="10" paddingX="4">
      {children}
    </Box>
  </Box>
);

Footer.propTypes = {
  children: T.node.isRequired,
};
