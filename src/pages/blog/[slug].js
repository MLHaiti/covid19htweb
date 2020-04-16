import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/core";

import { PageTitle } from "utils/page-title";

import { Layout } from "components";

const BlogPost = () => (
  <Layout>
    <PageTitle title="blog" />
    <Box
      marginTop="12"
      marginX="auto"
      paddingX="4"
      maxWidth={{ base: "710px" }}
    >
      <Heading
        as="h1"
        textAlign="center"
        marginBottom="10"
        fontSize={{
          base: "3xl",
          lg: "36px",
        }}
      >
        Lorem Ipsum
      </Heading>

      <Image
        rounded="md"
        objectFit="cover"
        src="https://via.placeholder.com/760x400.png?text=Lave+Men+Ou"
        // src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/07/Free-Writing-Apps_version_1-2-760x400.jpg"
        marginBottom="8"
      />

      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>

      <Heading
        as="h2"
        marginTop="12"
        marginBottom="6"
        fontSize={{
          base: "xl",
          lg: "24px",
        }}
      >
        Where does it come from?
      </Heading>
      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </Text>
      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced
        below for those interested. Sections 1.10.32 and 1.10.33 from "de
        Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
        original form, accompanied by English versions from the 1914 translation
        by H. Rackham.
      </Text>
      <Heading
        as="h2"
        marginTop="12"
        marginBottom="6"
        fontSize={{
          base: "xl",
          lg: "24px",
        }}
      >
        Why do we use it?
      </Heading>

      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        t is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </Text>
    </Box>
  </Layout>
);

export default BlogPost;
