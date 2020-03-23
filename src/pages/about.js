import React from "react";
import Head from "next/head";
import { Layout } from "components";
import { Box } from "@chakra-ui/core";

export default () => (
  <>
    <Head>
      <title>codvid19ht</title>
    </Head>
    <Layout>
      <br />
      <Box as="p">
        Ce site est un effort de groupes de jeunes voulant contribuer dans le
        combat qui doit être mené pour la survie de la population
      </Box>
    </Layout>
  </>
);
