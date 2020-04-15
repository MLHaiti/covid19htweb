import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/core";

import { PageTitle } from "utils/page-title";

const BlogPost = () => (
  <>
    <PageTitle title="blog" />
    <>
      <Header />
      <Main />
      <Footer />
    </>
  </>
);

const Header = () => {
  const [pageYOffset, setPageYOffset] = useState(0);

  const top = useRef(0);

  const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nextValue = window.pageYOffset;

    setPageYOffset((value) => {
      let _top = top.current + (value - nextValue);
      if (_top > 0) {
        _top = 0;
      }

      if (_top < -64) {
        _top = -64;
      }

      top.current = _top;
      return nextValue;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sticky = pageYOffset !== 0;

  return (
    <>
      <Box display="none" width="full" height="16" />

      <Flex
        as="header"
        height="16"
        paddingY="6"
        width="full"
        justifyContent="space-between"
        transition=" .2s ease"
        backgroundColor="hsla(0,0%,100%,.98)"
        alignItems="center"
        boxShadow={sticky ? "none" : "0 0 48px rgba(50,76,128,.05)"}
        position={sticky ? "fixed" : "static"}
        zIndex={sticky ? 10 : "auto"}
        top={top.current}
      >
        <Box>
          <Box>Sante pam</Box>
        </Box>
        <Box>Menu</Box>
      </Flex>
    </>
  );
};

const Main = () => (
  <Box
    as="main"
    marginX="auto"
    maxWidth={{
      base: "540px",
      lg: "1080px",
    }}
    marginBottom={{
      base: "65px",
      lg: "95px",
    }}
  >
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
        9 Powerful Writing Apps for Any Type of Writing Project
      </Heading>

      <Image
        rounded="md"
        objectFit="cover"
        src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/07/Free-Writing-Apps_version_1-2-760x400.jpg"
        marginBottom="8"
      />

      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        Even if you’re a pen-on-paper writer for the first draft, you’ll have to
        translate your writing to a digital format at some point in the process.
        Here are a few writing apps to help you, broken out by the type of
        project you might be working on.
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
        3 Great Online Writing Apps
      </Heading>
      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        Grammarly is a writing assistant. We provide clear, constructive writing
        suggestions that work where you work, enabling better understanding
        between people. Our products can help you with grammar, spelling,
        punctuation, conciseness, clarity, readability, and more.
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
        2 Helpful Blogging Apps
      </Heading>

      <Text marginBottom="4" fontSize="lg" lineHeight="tall">
        WordPress.com helps you start a blog or build a website in seconds
        without any technical knowledge. The software it’s based on (confusingly
        named WordPress.org), powers 32% of the Internet, so it’s a very popular
        blogging platform. With WordPress, you can create custom blogs easily
        and share them on a custom website of your choosing.
      </Text>
    </Box>
  </Box>
);

const Footer = () => (
  <Box as="footer">
    <Box>Footer</Box>
  </Box>
);

export default BlogPost;
