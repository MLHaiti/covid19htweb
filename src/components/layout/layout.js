import React from "react";
import Link from "next/link";
import T from "prop-types";
import { Box, Heading, Text } from "@chakra-ui/core";

import { Main } from "./main";
import { Footer } from "./footer";
import { Header } from "./header";
import { TopRightMenu } from "./top-right-menu";

export const Layout = ({ children }) => (
  <>
    <Header>
      <Link href="/">
        <a>
          <Heading as="h3" size="md">
            Codvid19ht
          </Heading>
        </a>
      </Link>

      <TopRightMenu />
    </Header>
    <Main>{children}</Main>
    <Footer>
      <Text fontSize="sm">Une société en bonne santé.</Text>
    </Footer>
  </>
);

Layout.propTypes = {
  children: T.node.isRequired,
};
