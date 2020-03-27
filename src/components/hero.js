import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import PropTypes from "prop-types";

export const Hero = ({ text }) => (
  <Heading
    as="h1"
    textAlign={{ base: "left", lg: "center" }}
    fontSize={{ base: "lg" }}
    marginY={{ base: 4, lg: 8 }}
  >
    {text}
  </Heading>
);

Hero.propTypes = {
  text: PropTypes.string,
};

Hero.defaultProps = {
  text: "Enfòmasyon k'ap pèmèt ou sove lavi ou ak lavi fanmi/zanmi ou.",
};
