import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import PropTypes from "prop-types";

export const Hero = ({ text }) => (
  <Heading
    as="h1"
    textAlign={{ base: "left", lg: "center" }}
    fontSize={{ base: "lg" }}
    marginY={{ base: 4, lg: 8 }}
    fontFamily="mono"
    fontWeight="normal"
  >
    {text}
  </Heading>
);

Hero.propTypes = {
  text: PropTypes.string,
};

Hero.defaultProps = {
  text: "Toujou Proteje tèt ak moun ki bò kote ou.",
};
