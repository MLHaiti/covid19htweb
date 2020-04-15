import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  FormLabel,
  Input,
  FormHelperText,
  FormControl,
  Select,
  Button,
  List,
  IconButton,
} from "@chakra-ui/core";
import { useForm, Controller } from "react-hook-form";

import { ArticleView } from "components/article";
import { Editor } from "components/article/editor";
import { Separator, ArticleTypeInfo } from "./block";
import { articleTypeOptions, articleTypeInfo } from "./helpers";

export const ArticleCompositor = ({ article }) => {
  const [mode, setMode] = useState("edit");
  const { register, handleSubmit, errors, formState, getValues } = useForm();
  const contentRef = useRef(null);

  const isNew = !article.id;

  const onSubmit = (data) => {
    console.log(contentRef.current);
    console.log(data);
  };

  console.log(getValues());

  if (mode === "edit") {
    return (
      <Flex direction="row" paddingX="2">
        <Box
          width="full"
          // maxWidth="800px"
          marginX="auto"
          paddingY="8"
          overflow="hidden"
        >
          <Box fontSize="sm" marginBottom="4">
            <Text>Mèsi anpil dèske ou deside kontriye nan konteni sit la.</Text>
            <Text>
              Pa bliye chak atik gen pou revize pa yon lòt otè avan li pibliye.
              Mèsi pou pasyans ou
            </Text>
          </Box>
          <Separator />
          {/* <Editor /> */}
          <Box width="full" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Box>
                <FormLabel htmlFor="article-type" fontSize="lg">
                  Modèl atik wap ekri
                </FormLabel>
                <ArticleTypeInfo />
              </Box>
              <Select name="type" ref={register()} placeholder="Select option">
                {articleTypeOptions.map((el) => (
                  <option key={el.value} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </Select>
              <FormHelperText id="article-type-helper-text">
                Chwazi modèl atik wap ekri a.
              </FormHelperText>
            </FormControl>
            <Separator />
            <FormControl>
              <FormLabel htmlFor="article-title" fontSize="lg">
                Tik atik la
              </FormLabel>
              <Input
                name="title"
                id="article-title"
                aria-describedby="article-title-helper-text"
                isRequired
                ref={register()}
              />
              <FormHelperText id="article-title-helper-text">
                Chwazi yon ti ki fasil pou konpran. Pou tradiksyon mete tradwi
                tit orijinèl la.
              </FormHelperText>
            </FormControl>
          </Box>
          {/* <Editor contentRef={contentRef} /> */}
        </Box>
        <Box
          width="full"
          // maxWidth="800px"
          marginX="auto"
          paddingY="8"
          overflow="hidden"
        >
          {/* <ArticleView /> */}
        </Box>
      </Flex>
    );
  }

  return <ArticleView />;
};

/**
 * https://www.grammarly.com/blog/writing-apps/
 * https://www.grammarly.com/blog/
 * https://css-tricks.com/scroll-fix-content/
 */

// <Box marginY="8">
// <Button
//   loadingText="Nap anrejistre li"
//   isLoading={isLoading}
//   onClick={() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       window.localStorage.setItem(
//         "draftArticle",
//         JSON.stringify(value)
//       );

//       setIsLoading(false);
//     }, 3000);
//   }}
//   variantColor="green"
// >
//   Anrejistre
// </Button>
// </Box>
