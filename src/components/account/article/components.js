import React from "react";
import T from "prop-types";
import {
  Box,
  Heading,
  Text,
  AccordionHeader,
  AccordionPanel,
  Icon,
} from "@chakra-ui/core";

export const AccordionHeaderBox = ({ text }) => (
  <Box flex="1" textAlign="left" fontSize="lg">
    {text}
  </Box>
);

AccordionHeaderBox.propTypes = {
  text: T.string.isRequired,
};

export const AccordionHeaderStyled = ({ isExpanded, text }) => (
  <AccordionHeader _expanded={{ bg: "blue.600", color: "white" }}>
    <AccordionHeaderBox text={text} />
    <Icon size="12px" name={isExpanded ? "minus" : "add"} />
  </AccordionHeader>
);

AccordionHeaderStyled.propTypes = {
  text: T.string.isRequired,
  isExpanded: T.bool.isRequired,
};

export const AccordionPanelStyled = ({ children }) => (
  <AccordionPanel paddingBottom={4}>{children}</AccordionPanel>
);

AccordionPanelStyled.propTypes = {
  children: T.node.isRequired,
};
