import React from "react";
import T from "prop-types";
import { Heading, Box, Link, Flex, Button } from "@chakra-ui/core";

export const ArticleTitle = ({ text }) => (
  <Heading as="h1" size="lg" marginY="4">
    {text}
  </Heading>
);

ArticleTitle.propTypes = {
  text: T.string.isRequired,
};

export const ArticleSubtitle = ({ text }) => (
  <Heading as="h2" size="md" textDecoration="underline" marginY="8">
    {text}
  </Heading>
);

ArticleSubtitle.propTypes = {
  text: T.string.isRequired,
};
