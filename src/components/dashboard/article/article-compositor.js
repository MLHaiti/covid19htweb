import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/core";
import { FullDiv } from "components/brics";

import { ArticleView } from "components/article";
import { Editor } from "components/article/editor";

export const ArticleCompositor = ({ params }) => {
  const [mode, setMode] = useState("edit");

  if (mode === "edit") {
    return (
      <Flex direction="row">
        <Box
          width="full"
          // maxWidth="800px"
          marginX="auto"
          paddingY="8"
          overflow="hidden"
        >
          <Editor />
        </Box>
        <Box
          width="full"
          // maxWidth="800px"
          marginX="auto"
          paddingY="8"
          overflow="hidden"
        >
          <ArticleView />
        </Box>
      </Flex>
    );
  }

  return <ArticleView />;
};
