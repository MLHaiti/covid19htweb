import React from "react";
import T from "prop-types";
import { Box, Flex, FormLabel } from "@chakra-ui/core";

const LABEL_WIDTH = 50;

export const Section = ({ name, children }) => (
  <Box
    as="section"
    margin={{ lg: 8 }}
    marginX={{ lg: 12 }}
    shadow="rgba(0, 0, 0, 0.15) 0px 0px 20px 0px"
    overflow="hidden"
    borderRadius="lg"
  >
    <Box
      as="header"
      paddingX="6"
      paddingY="4"
      backgroundColor="#6c7ae0" // "#F5F5F5"
      color="white"
      fontWeight="light"
    >
      {name}
    </Box>
    <Box as="main" paddingX="4">
      {children}
    </Box>
  </Box>
);

Section.propTypes = {
  name: T.string.isRequired,
  children: T.node.isRequired,
};

export const Content = ({ label, labelWidth, children }) => (
  <Flex
    direction={{
      base: "column",
      lg: "row",
    }}
    marginY="6"
    marginX="4"
  >
    <Box
      width={`${labelWidth}px`}
      minWidth={`${labelWidth}px`}
      fontWeight="bold"
      marginRight="8"
    >
      {label && <Box>{label}:</Box>}
    </Box>
    {children}
  </Flex>
);

Content.propTypes = {
  label: T.string.isRequired,
  labelWidth: T.number,
  children: T.node.isRequired,
};

Content.defaultProps = {
  labelWidth: LABEL_WIDTH,
};

export const FormContent = ({ label, labelWidth, children, htmlFor }) => (
  <Flex
    direction={{
      base: "column",
      lg: "row",
    }}
    marginY="6"
    marginX="4"
  >
    <FormLabel
      width={`${labelWidth}px`}
      minWidth={`${labelWidth}px`}
      fontWeight="bold"
      marginRight="8"
      htmlFor={htmlFor}
    >
      {label}:
    </FormLabel>
    {children}
  </Flex>
);

FormContent.propTypes = {
  label: T.string.isRequired,
  labelWidth: T.number,
  children: T.node.isRequired,
  htmlFor: T.string.isRequired,
};

FormContent.defaultProps = {
  labelWidth: LABEL_WIDTH,
};
