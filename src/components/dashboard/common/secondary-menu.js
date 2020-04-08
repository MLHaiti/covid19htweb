import React from "react";
import T from "prop-types";
import { Box } from "@chakra-ui/core";

export default function SecondaryMenu({ children }) {
  return (
    <Box width="full" height="8">
      {children}
    </Box>
  );
}

SecondaryMenu.propTypes = {
  children: T.node,
};

SecondaryMenu.defaultProps = {
  children: "",
};
