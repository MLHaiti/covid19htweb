import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Stack,
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
  CloseButton,
} from "@chakra-ui/core";
import { useForm, Controller } from "react-hook-form";

// import { ArticleView } from "components/article";
import { Editor } from "components/article/editor";
import { Separator, ArticleTypeInfo } from "./block";
import { articleTypeOptions, articleTypeInfo } from "./helpers";

export const ArticleCompositor = ({ article }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [mode, setMode] = useState("edit"); // edit || preview
  const { register, handleSubmit, errors, formState, getValues } = useForm();
  const submitRef = useRef(null);

  const contentRef = useRef(null);

  const isNew = !article.id;

  const onSubmit = (data) => {
    console.log(contentRef.current);
    console.log(data);
  };

  // console.log(getValues());
  // console.log(contentRef.current);

  return (
    <Stack padding="4">
      {showWelcome === true ? (
        <Flex direction="row">
          <Stack flexGrow={1} paddingTop="4">
            <Text>Mèsi anpil dèske ou deside kontriye nan konteni sit la.</Text>
            <Text>
              Pa bliye chak atik gen pou revize pa yon lòt otè avan li pibliye.
              Mèsi pou pasyans ou
            </Text>
          </Stack>
          <Box paddingX="2">
            <CloseButton
              onClick={() => {
                setShowWelcome(false);
              }}
              float="right"
            />
          </Box>
        </Flex>
      ) : null}
      {showWelcome === false ? (
        <Stack>
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
            <Button display="none" type="submit" ref={submitRef}>
              Sumit
            </Button>
          </Box>
          <Editor contentRef={contentRef} />
          <div id="div-after-article-editor" height="10px">
            {"\u00a0"}
          </div>
        </Stack>
      ) : null}
      <Button
        onClick={() => {
          submitRef.current.click();
        }}
        isDisabled={formState.isSubmitting}
      >
        Save
      </Button>
    </Stack>
  );
};
