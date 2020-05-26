import T from "prop-types";
import React, { useState, useRef, useCallback, useEffect } from "react";
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
  Heading,
  Skeleton,
  CloseButton,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { Editor } from "components/article/editor";
import { SidePanel } from "components/dashboard/article/sidepanel";

// import { ArticleView } from "components/article";
import { Separator, ArticleTypeInfo } from "./block";
import { articleTypeOptions, saveArticle } from "./helpers";

const blank = [{ type: "paragraph", children: [{ text: "" }] }];

export const ArticleCompositor = ({
  articleInfo,
  autoSave,
  onComplete,
  onClose,
}) => {
  const [showGuideline, setShowGuideline] = useState(
    articleInfo.id === undefined
  );
  const [mode, setMode] = useState("edit"); // edit || preview
  const { data, error } = useSWR(`/article${articleInfo.id}`, async () => {
    if (articleInfo.id) {
      // we need to find that article
      let list = window.localStorage.getItem("@articleList");
      list = list ? JSON.parse(list) : [];
      const one = list.filter((el) => el.id === articleInfo.id);
      if (one.length) {
        return one[0];
      }
    }

    return {
      content: blank,
      title: "",
      type: "",
      id: uuidv4(), // we need to use a mongodb objectid
    };
  });

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: articleInfo,
  });
  const submitRef = useRef(null);
  const contentRef = useRef(null);

  const actionClick = useCallback(() => {}, []);
  const save = useCallback(() => {
    const _article = {
      ...data,
      ...getValues(),
      id: data.id,
      content: contentRef.current,
    };

    saveArticle(_article);
  }, [data]);
  const toggleMode = () => {
    const modeMap = { edit: "preview", preview: "edit" };
    setMode(modeMap[mode]);
  };

  const onSubmit = (data) => {
    // TODO call onComplete
    const content = contentRef.current;
    const { type, title } = data;
    onComplete();
  };

  if (showGuideline) {
    return (
      <Flex
        padding="4"
        flexGrow={1}
        paddingTop="4"
        // justifyContent="center"
        direction="column"
        maxWidth="600px"
        marginX="auto"

        // alignItems="center"
      >
        <Box marginBottom="12">
          <Text
            fontSize="2xl"
            textDecoration="underline"
            fontWeight="bold"
            textAlign="center"
          >
            Enpòtan
          </Text>
        </Box>
        <Text marginBottom="4" fontSize="lg" lineHeight="tall">
          Mèsi anpil dèske ou deside kontriye ak konteni sou platfòm nan.
        </Text>
        <Text marginBottom="4" fontSize="lg" lineHeight="tall">
          Ojektif nou se gen konteni nan kantite ak nan kalite. Yon fason pou
          nou ka bay popilasyon an bon jan enfòmasyon kap pèmèt li pran preksyon
          e rete an sante
        </Text>
        <Text marginBottom="8" fontSize="lg" lineHeight="tall">
          Nan lide pou asire kalite chak atik gen pou revize pa yon lòt otè avan
          li pibliye. Moun sa ak kapab di eske atik la merite koreksyon avan li
          pibliye. Mèsi pou pasyans ak konpreyansyon ou.
        </Text>
        <Box marginTop="8">
          <Button
            onClick={() => {
              setShowGuideline(false);
            }}
            size="sm"
            variantColor="green"
          >
            Wi mwen konpran e dakò.
          </Button>
        </Box>
      </Flex>
    );
  }

  const dataIsLoading = data === error; //

  if (dataIsLoading) {
    return (
      <Flex padding="4" direction="column" alignItems="center">
        <Skeleton height="20px" my="10px" width="40%" />
        <Skeleton height="20px" my="10px" width="40%" />
        <Skeleton height="20px" my="10px" width="40%" />
        <Skeleton height="20px" my="10px" width="40%" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Stack padding="4">
        <Box>We could not load the data. Close and try and.</Box>
      </Stack>
    );
  }

  if (mode === "preview") {
    return (
      <Stack padding="4">
        <Box textAlign="right">
          <Box as="span" mr="4">
            Preview Mode
          </Box>
          <CloseButton onClick={toggleMode} />
        </Box>
      </Stack>
    );
  }

  return (
    <Box width="full">
      <Box>
        <Heading as="h3" marginY="2" textAlign="center">
          Kompozitè.
        </Heading>
      </Box>
      <Flex direction="row" justifyContent="space-between">
        <Stack minWidth="710px" width="710px" borderRadius="md">
          <Box width="full" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Box>
                <FormLabel htmlFor="article-type" fontSize="lg">
                  Modèl atik wap ekri
                </FormLabel>
                <ArticleTypeInfo />
              </Box>
              <Select
                isRequired
                name="type"
                ref={register()}
                placeholder="Select option"
              >
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
          <Editor contentRef={contentRef} initialValue={data.content} />
          <div id="div-after-article-editor" height="10px">
            {"\u00a0"}
          </div>
        </Stack>

        <Box width="400px" marginRight="4">
          <SidePanel
            onActionClick={actionClick}
            onSave={save}
            onToggleMode={toggleMode}
          />
        </Box>
      </Flex>
    </Box>
  );
};

ArticleCompositor.propTypes = {
  articleInfo: T.object.isRequired,
  onComplete: T.func.isRequired,
  autoSave: T.func.isRequired,
};
