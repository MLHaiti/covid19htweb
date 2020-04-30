import React from "react";
import NextLink from "next/link";
import T from "prop-types";
import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Stack,
  Heading,
  Link,
} from "@chakra-ui/core";

// https://towardsdatascience.com/10-data-science-competitions-for-you-to-hone-your-skills-for-2020-32d87ee19cc9

export const ArticlePreview = ({ title, coverUrl, author, abstract }) => (
  <>
    <Box marginBottom="8" display={{ md: "none", xl: "block" }}>
      <NextLink href="/blog/hola">
        <a>
          <Stack maxWidth="338px">
            <span>one</span>
            <Image src={coverUrl} borderRadius="md" />
            <Heading as="h3" marginTop="2">
              {title}
            </Heading>
            <Box as="span" fontSize="sm">
              ekri pa: <Box as="strong">{author}</Box>
            </Box>
            <Box as="span" marginTop="2">
              {abstract}
            </Box>
          </Stack>
        </a>
      </NextLink>
    </Box>
    <Box marginBottom="8" display={{ base: "none", md: "block", xl: "none" }}>
      <NextLink href="/blog/hola">
        <a>
          <Stack maxWidth="338px">
            <span>two</span>
            <Image src={coverUrl} borderRadius="md" />
            <Heading as="h3" marginTop="2">
              {title}
            </Heading>
            <Box as="span" fontSize="sm">
              ekri pa: <Box as="strong">{author}</Box>
            </Box>
            <Box as="span" marginTop="2">
              {abstract}
            </Box>
          </Stack>
        </a>
      </NextLink>
    </Box>
  </>
);
