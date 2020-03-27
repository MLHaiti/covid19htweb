import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import {
  Layout,
  SectionWithCollapse,
  LinkToPage,
  CollapseSection,
  CollapseContent,
  Divider,
} from "components";
import { Link, Flex } from "@chakra-ui/core";

import fiveActions from "../data/five-actions";

export default () => (
  <>
    <Head>
      <title>Santepam</title>
    </Head>
    <Layout>
      <br />
      <SectionWithCollapse title="5 konpòtman pou sove lavi ou">
        {fiveActions.map((el) => (
          <CollapseContent key={el.title} title={el.title}>
            {el.value}
          </CollapseContent>
        ))}
        <Divider />
        <Flex direction="row" justifyContent="flex-end">
          <NextLink href="/poukisa-prekosyon-sa-yo" passHref>
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
              _hover={{ textDecoration: "none" }}
            >
              Pou kisa tout bagay sa yo?
            </Link>
          </NextLink>
        </Flex>
      </SectionWithCollapse>

      <LinkToPage
        text="Kisa ki nouvo korona viris la"
        href="/kisa-ki-nouvo-korona-viris-la"
        headingProps={{ marginTop: "12" }}
      />

      <LinkToPage
        text="Konsèy pou chak moun"
        href="/konsey-pou-chak-moun"
        headingProps={{ marginTop: "12" }}
      />
    </Layout>
  </>
);
