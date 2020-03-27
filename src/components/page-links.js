import React, { useState } from "react";
import NextLink from "next/link";
import T from "prop-types";
import { Box, Collapse, Heading, Icon } from "@chakra-ui/core";

export const LinkToPage = ({ text, href }) => (
  <Heading as="h3" size="md" fontWeight="normal">
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
        onClick={() => {
          setShow(!show);
        }}
        as="h3"
        size="md"
        fontWeight="normal"
      >
        <Box as="span" mr="2">
          {title}
        </Box>
        {show ? (
          <Icon name="chevron-up" size="24px" />
        ) : (
          <Icon name="chevron-down" size="24px" />
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

export const CollapseSection = ({ title, children }) => (
  <Box marginY="4">
    <Box fontWeight={600} fontSize="2xl" mb="2">
      {title}
    </Box>
    <Box>{children}</Box>
  </Box>
);

CollapseSection.propTypes = {
  title: T.string.isRequired,
  children: T.node.isRequired,
};
