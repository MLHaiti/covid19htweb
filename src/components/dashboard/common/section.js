import React from "react";
import T from "prop-types";
import {
  Box,
  Flex,
  Heading,
  useTheme,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/core";

const LABEL_WIDTH = 50;

export const SectionContent = ({ label, labelWidth, children }) => (
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

SectionContent.propTypes = {
  label: T.string.isRequired,
  labelWidth: T.number,
  children: T.node.isRequired,
};

SectionContent.defaultProps = {
  labelWidth: LABEL_WIDTH,
};

export const Section = ({ name, children }) => (
  <Box
    as="section"
    margin={{ lg: 8 }}
    marginX={{ lg: 12 }}
    border="1px"
    borderColor="gray.400"
    borderRadius="lg"
  >
    <Box
      as="header"
      paddingX="6"
      paddingY="4"
      backgroundColor="#F5F5F5"
      borderBottom="none"
      borderRadius="lg"
      borderBottomWidth="0"
      borderTopColor="gray.400"
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
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

export const FormSectionContent = ({
  label,
  labelWidth,
  children,
  htmlFor,
}) => (
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
      htmlFor={htmlFor}
      // textAlign={}
      marginRight="8"
    >
      {label}:
    </FormLabel>
    {children}
  </Flex>
);

FormSectionContent.propTypes = {
  label: T.string.isRequired,
  labelWidth: T.number,
  children: T.node.isRequired,
  htmlFor: T.string.isRequired,
};

FormSectionContent.defaultProps = {
  labelWidth: LABEL_WIDTH,
};

export const FormSection = ({ name, children, onSubmit }) => (
  <Box
    as="section"
    margin={{ lg: 8 }}
    marginX={{ lg: 12 }}
    border="1px"
    borderColor="gray.400"
    borderRadius="lg"
  >
    <Box
      as="header"
      paddingX="6"
      paddingY="4"
      backgroundColor="#F5F5F5"
      borderBottom="none"
      borderRadius="lg"
      borderBottomWidth="0"
      borderTopColor="gray.400"
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      fontWeight="light"
    >
      {name}
    </Box>
    <Box as="main" paddingX="4">
      <Box as="form" onSubmit={onSubmit}>
        {children}
      </Box>
    </Box>
  </Box>
);

FormSection.propTypes = {
  name: T.string.isRequired,
  children: T.node.isRequired,
  onSubmit: T.func.isRequired,
};
