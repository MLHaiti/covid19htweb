import React, { useState } from "react";
import { Box } from "@chakra-ui/core";
import { FullDiv } from "components/brics";

import { ArticleView } from "components/article";
import { Editor } from "components/article/editor";

export const ArticleEditor = ({ params }) => {
  const [mode, setMode] = useState("edit");

  if (mode === "edit") {
    return (
      <Box
        width="full"
        // maxWidth="800px"
        marginX="auto"
        paddingY="8"
        overflow="hidden"
      >
        <Editor />
      </Box>
    );
  }

  return <ArticleView />;
};
