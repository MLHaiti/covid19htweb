import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/core";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  // LinkedinShareButton,
  // LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const baseUrl = "http://github.com"; // TODO UPDATE TO SET DYNAMICALLY

export const ShareIt = () => {
  const router = useRouter();
  const { asPath, pathname } = router;
  const [title, setTitle] = useState("Santepam");

  const shareUrl = asPath ? baseUrl + asPath : baseUrl + pathname;

  useEffect(() => {
    // const { asPath, pathname } = router;
    if (document.title) {
      setTitle(document.title);
    }
  }, []);

  return (
    <Box>
      <Flex flexDirection="row" justifyContent="space-between" maxWidth="200px">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        {/* <LinkedinShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton> */}
      </Flex>
      <Box as="p" marginY="4" fontSize={{ base: "sm", lg: "lg" }}>
        Si atik sa te enfòme ou.
        <br /> Pataje li pou ede lòt moun konprann.
      </Box>
    </Box>
  );
};
