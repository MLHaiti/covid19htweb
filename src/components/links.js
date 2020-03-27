import React from "react";
import T from "prop-types";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";

export const ButtonLink = ({ href, text, nextLinkOverride, linkOverride }) => (
  <p>
    <NextLink href={href} passHref {...nextLinkOverride}>
      <Link
        paddingX="16px"
        fontWeight="bold"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="40px"
        borderRadius="md"
        borderWidth="1px"
        borderColor="black"
        borderStyle="solid"
        maxWidth="350px"
        _hover={{ textDecoration: "none" }}
        {...linkOverride}
      >
        {text}
      </Link>
    </NextLink>
  </p>
);

ButtonLink.propTypes = {
  href: T.string.isRequired,
  text: T.string.isRequired,
  linkOverride: T.object,
  nextLinkOverride: T.object,
};

ButtonLink.defaultProps = {
  linkOverride: {},
  nextLinkOverride: {},
};
