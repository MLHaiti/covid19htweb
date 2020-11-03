import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/core";
import { LeftSide } from "./LeftSide";

// EDEFF3
const RightSide = ({ children }) => (
  <Box padding="8" width="100%" backgroundColor="#edeff3">
    {children}
  </Box>
);

const Toolbar = () => <Box height="40px">Toolbar </Box>;
const MainContent = ({ children }) => <Box>{children}</Box>;

export const AccountLayout = ({ children }) => {
  console.log("cool");
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/uppy-dashboard.css" />
        <link rel="stylesheet" href="/css/uppy-webcam.css" />
      </Head>
      <Flex direction="row">
        <LeftSide />
        <RightSide>
          <MainContent>{children}</MainContent>
        </RightSide>
      </Flex>
    </>
  );
};
