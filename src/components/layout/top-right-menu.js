import React from "react";
import T from "prop-types";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  CloseButton,
  Heading,
  IconButton,
  Link,
} from "@chakra-ui/core";

import { AiOutlineMenu } from "react-icons/ai";

export const TopRightMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="row" justifyContent="flex-end" alignItems="center">
        <Flex
          display={{
            base: "none",
            lg: "flex",
          }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <MenuItem
            text="Akèy"
            to="/"
            fontSize="xl"
            wrapper={{ marginRight: "8" }}
          />
          <MenuItem
            text="Kiyès nou ye?"
            to="/about"
            fontSize="xl"
            wrapper={{ marginRight: "8" }}
          />
          <MenuItem
            text="Kontribye"
            to="/contribute"
            fontSize="xl"
            wrapper={{ marginRight: "8" }}
          />
        </Flex>
        <IconButton
          aria-label="Search database"
          // size="xl"
          color="black"
          fontSize="24px"
          variant="link"
          icon={AiOutlineMenu}
          onClick={onOpen}
          display={{
            base: "block",
            lg: "none",
          }}
        />
      </Flex>

      <Drawer placement="right" size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex direction="row">
              <Heading as="h3" size="md" marginRight="auto">
                Covid19ht
              </Heading>
              <CloseButton onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex marginY="4" direction="column">
              <MenuItem text="Akèy" to="/" wrapper={{ marginY: "8" }} />
              <MenuItem
                text="Kiyès nou ye?"
                to="/about"
                wrapper={{ marginY: "8" }}
              />
              <MenuItem
                text="Kontribye"
                to="/contribute"
                wrapper={{ marginY: "8" }}
              />
              <br />
              <Flex justifyContent="center">
                <CloseButton size="lg" onClick={onClose} />
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Menu = ({ close, isVertical = true }) => (
  <Flex marginY="4" direction={isVertical ? "column" : "row"}>
    <MenuItem text="Akèy" to="/" wrapper={{}} />
    <MenuItem text="Kiyès nou ye?" to="/about" wrapper={{}} />
    <MenuItem text="Kontribye" to="/contribute" wrapper={{}} />
    <br />
    {close ? (
      <Flex justifyContent="center">
        <CloseButton size="lg" onClick={close} />
      </Flex>
    ) : null}
  </Flex>
);

Menu.propTypes = {
  isVertical: T.bool,
  close: T.func,
};

Menu.defaultProps = {
  isVertical: true,
  close: null,
};

const MenuItem = ({ text, to, wrapper, ...rest }) => (
  <Flex justifyContent="center" {...wrapper}>
    <NextLink href={to} passHref>
      <Link fontSize="2xl" {...rest}>
        {text}
      </Link>
    </NextLink>
  </Flex>
);

MenuItem.propTypes = {
  text: T.string.isRequired,
  to: T.string.isRequired,
  wrapper: T.object.isRequired,
};
