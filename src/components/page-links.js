import React, { useState } from "react";
import NextLink from "next/link";
import T from "prop-types";
import { Box, Collapse, Heading, Icon, Link } from "@chakra-ui/core";

export const LinkToPage = ({ text, href, headingProps = {} }) => (
  <Heading
    as="h3"
    size="md"
    fontWeight="normal"
    fontSize="3xl"
    {...headingProps}
  >
    <NextLink href={href}>
      <a>{text}</a>
    </NextLink>
  </Heading>
);

export const SectionWithCollapse = ({ title, children }) => {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Heading
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
        as="h3"
        size="md"
        fontWeight="normal"
      >
        <Box as="span" mr="2" fontSize="3xl">
          {title}
        </Box>
        {show ? (
          <Icon name="chevron-up" size="28px" />
        ) : (
          <Icon name="chevron-down" size="28px" />
        )}
      </Heading>
      <Collapse mt={4} isOpen={show}>
        {children}
      </Collapse>
    </Box>
  );
};

SectionWithCollapse.propTypes = {
  title: T.string.isRequired,
  children: T.node.isRequired,
};

export const CollapseContent = ({ title, children }) => (
  <Box>
    <Heading as="h4" size="md" fontFamily="mono" marginTop="8" marginBottom="4">
      {title}
    </Heading>
    <Box>{children}</Box>
  </Box>
);

CollapseContent.propTypes = {
  title: T.string.isRequired,
  children: T.node.isRequired,
};
