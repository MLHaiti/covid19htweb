import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Layout, Ol } from "components";
import { Heading, Box, Link } from "@chakra-ui/core";

export default () => (
  <>
    <Head>
      <title>codvid19ht</title>
    </Head>
    <Layout>
      <Heading as="h2" marginTop="2">
        Konsèy ki pi enpòtan
      </Heading>
      <Ol marginY="4" fontSize="lg">
        <li>
          Lave men ou byen lave ak dlo epi savon pandan 20 segond chak fwa ou
          gen chans
        </li>
        <li>Pa mete men nan bouch, nan je, nan neg</li>
        <li>Pa mache si ou pa gen bezwen - Pa kole sou lòt moun</li>
        <li>
          Si ou sispèk ou malad, pran prekosyon pou pa kontamine fanmi ak zanmi
          ou epi rele nimero ijans
        </li>
      </Ol>
      <Box as="p" marginTop="8">
        <NextLink href="/about" passHref>
          <Link>A propos du site</Link>
        </NextLink>
      </Box>
    </Layout>
  </>
);
