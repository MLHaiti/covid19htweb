import React, { useCallback } from "react";
import { PageTitle } from "utils/page-title";
import { Layout, LoadMore } from "components";
import { v4 as uuidv4 } from "uuid";
import { Box, Heading } from "@chakra-ui/core";
import { ArticlePreview } from "components/layout";

const getOne = () => ({
  id: uuidv4(),
  title: "Lorem ipsum dolor sit amet, adipiscing elit, sed.",
  coverUrl: "/images/338x178.png",
  abstract:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
  author: "Emmanuel Fleurine",
});

const dummies = Array.from(Array(4), () => getOne());

export default () => {
  const renderer = useCallback((data) => <ArticlePreview {...data} />, []);
  const loadMore = useCallback(() => Array.from(Array(10), () => getOne()), []);

  return (
    <>
      <PageTitle title="Akèy" />
      <Layout>
        <Box width="full" marginTop="24">
          <Heading as="h1" size="2xl" textAlign="center">
            Coming soon. Stay tight.
          </Heading>
        </Box>
        <LoadMore
          initialData={dummies}
          renderer={renderer}
          loadMore={loadMore}
        />
      </Layout>
    </>
  );
};
