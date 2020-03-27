import React from "react";
import Head from "next/head";
import {
  Layout,
  Ul,
  ArticleTitle,
  ArticleSubtitle,
  ArticleSection,
  ShareIt,
  Divider,
} from "components";
import { Box } from "@chakra-ui/core";

import content from "../data/poukisa-prekosyon-sa-yo";

const Paragraph = ({ children }) => (
  <Box marginY="8" as="p">
    {children}
  </Box>
);

export default () => (
  <>
    <Head>
      <title>Pou kisa tout bagay sa yo ?</title>
    </Head>
    <Layout hideHero marginY="4">
      <ArticleTitle text="Pou kisa tout bagay sa yo ?" />
      <ArticleSubtitle text="Ou poze yon bèl kesyon." />
      <ArticleSection>
        {content[0].data.map((text, i) => (
          <Paragraph key={`poukisa-s1-${i}`}>{text}</Paragraph>
        ))}
        <Ul>
          {content[1].data.map((text, i) => (
            <Box as="li" mb="4" key={`poukisa-s2-${i}`}>
              {text}
            </Box>
          ))}
        </Ul>
      </ArticleSection>

      <ArticleSection my="8">
        Mete konsèy sa yo an pratik chak jou, konsa wap ede pèsonèl sante yo nan
        konba sa.
      </ArticleSection>

      <Divider />
      <ShareIt />
    </Layout>
  </>
);
