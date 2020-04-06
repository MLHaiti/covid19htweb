import React from "react";
import T from "prop-types";
import NextLink from "next/link";
import { Box, Flex, CloseButton, Link } from "@chakra-ui/core";

export const TopMenu = ({ close }) => (
  <Flex marginY="4" direction="column">
    {/* <Button variantColor="teal" variant="link" fontSize="md" onClick={close}>
      Fèmen
    </Button> */}
    <MenuItem text="Akèy" to="/" />
    <MenuItem text="Kiyès nou ye?" to="/about" />
    <MenuItem text="Kontribye" to="/contribute" />
    <br />
    <Flex justifyContent="center">
      <CloseButton size="lg" onClick={close} />
    </Flex>
  </Flex>
);

const MenuItem = ({ text, to }) => (
  <Flex justifyContent="center" mt="8">
    <NextLink href={to} passHref>
      <Link fontSize="2xl">{text}</Link>
    </NextLink>
  </Flex>
);

MenuItem.propTypes = {
  text: T.string.isRequired,
  to: T.string.isRequired,
};
