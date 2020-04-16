import React from "react";
import T from "prop-types";
import { Box } from "@chakra-ui/core";

export const Main = ({ children }) => (
  <Box
    as="main"
    marginX="auto"
    maxWidth={{
      base: "540px",
      lg: "1080px",
    }}
    marginBottom={{
      base: "65px",
      lg: "95px",
    }}
  >
    <Box width="full" marginTop="10" paddingX="4">
      {children}
    </Box>
  </Box>
);

Main.propTypes = {
  children: T.node.isRequired,
};
