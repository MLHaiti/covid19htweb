import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Button,
  Link,
  Heading,
  Avatar,
  Text,
} from "@chakra-ui/core";
import useSWR from "swr";

const MenuLink = ({ text, href }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <NextLink href={href} passHref>
      <Link
        // paddingY="2"
        paddingLeft="4"
        marginBottom="4"
        display="block"
        // backgroundColor={href === pathname ? "#1637BC" : "none"}
        borderLeft={isActive ? "4px" : ""}
        borderLeftColor={isActive ? "#1637BC" : ""}
        _hover={{ textDecoration: "none" }}
      >
        {text}
      </Link>
    </NextLink>
  );
};

export const LeftSide = () => {
  const { data: user } = useSWR("userState", { initialData: {} });

  useEffect(() => {}, []);

  return (
    <Box
      width="300px"
      padding="4"
      shadow="rgba(0, 0, 0, 0.15) 0px 0px 10px 0px"
      minHeight="100vh"
    >
      <Box marginTop="4" marginBottom="8" paddingLeft="4">
        <Avatar size="lg" src={user.pictureUrl || "/images/foto.png"} />
        <Text marginTop="2">
          {user.firstName || ""} {user.lastName || ""}
        </Text>
      </Box>

      <MenuLink text="Paramèt" href="/account" />
      <MenuLink text="Jere Atik" href="/account/article" />
    </Box>
  );
};
