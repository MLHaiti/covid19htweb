import T from "prop-types";
import React, { useState, useRef, useEffect } from "react";
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
  CloseButton,
  Heading,
  Accordion,
  AccordionItem,
  Checkbox,
  Switch,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { StickWrapper } from "components/sticky-wrapper";
import { Editor } from "components/article/editor";
import { ImageGallery } from "components/dashboard/article/image-gallery";
import { Actions } from "./action-button";
import { AccordionHeaderStyled, AccordionPanelStyled } from "./components";
import { CoverImage } from "./cover-image";

// import { ArticleView } from "components/article";
import { Separator, ArticleTypeInfo } from "./block";
import { articleTypeOptions } from "./helpers";

let autoSaveInterval = null;

export const ArticleCompositor = ({ article, autoSave, onComplete }) => {
  const [initialValue, setInitialValue] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mode, setMode] = useState("edit"); // edit || preview
  const { register, handleSubmit, setValue } = useForm();
  const submitRef = useRef(null);

  const contentRef = useRef(null);

  const actionClick = () => {};

  useEffect(() => {
    const { type, title, content } = article;
    setValue([{ type: type || "" }, { title: title || "" }]);
    setInitialValue(content);
  }, []);

  const onSubmit = (data) => {
    // TODO call onComplete
    const content = contentRef.current;
    const { type, title } = data;
    onComplete();
  };

  if (showWelcome) {
    return (
      <Stack padding="4">
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
      </Stack>
    );
  }

  if (mode === "preview") {
    return (
      <Box width="full">
        <Box>We will show the preview</Box>
      </Box>
    );
  }

  return (
    <Box width="full">
      <Box>
        <Heading as="h2" marginY="2" textAlign="center">
          Editè Tèks.
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
          {initialValue.length ? (
            <Editor contentRef={contentRef} initialValue={initialValue} />
          ) : null}
          <div id="div-after-article-editor" height="10px">
            {"\u00a0"}
          </div>
        </Stack>

        <Box width="400px" marginRight="4">
          <StickWrapper
            scrollTopKey="articleEditorScrollTop"
            targetName="articleEditorActions"
          >
            <Accordion allowToggle defaultIndex={[2]}>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionHeaderStyled
                      isExpanded={isExpanded}
                      text="Konfigirasyon"
                    />
                    <AccordionPanelStyled>
                      <Box marginBottom="8">
                        <Text marginBottom="2" fontSize="sm">
                          Kèk Konfigirasyon
                        </Text>
                        <Flex marginBottom={2}>
                          <Switch
                            size="sm"
                            id="config-autosave"
                            onChange={(v) => {
                              if (v.target.checked) {
                                autoSaveInterval = setInterval(autoSave, 2000);
                              } else {
                                clearInterval(autoSaveInterval);
                              }
                            }}
                          />
                          <FormLabel marginLeft={2} htmlFor="config-autosave">
                            Anrejistre otomatikman chak 2 minit
                          </FormLabel>
                        </Flex>

                        <Button
                          variantColor="orange"
                          size="sm"
                          onClick={() => setMode("preview")}
                        >
                          Gade preview
                        </Button>
                      </Box>
                    </AccordionPanelStyled>
                  </>
                )}
              </AccordionItem>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionHeaderStyled
                      isExpanded={isExpanded}
                      text="Imaj kouvèti"
                    />

                    <AccordionPanelStyled>
                      <CoverImage imageInfo={{}} onChange={() => {}} />
                    </AccordionPanelStyled>
                  </>
                )}
              </AccordionItem>
            </Accordion>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionHeaderStyled
                    isExpanded={isExpanded}
                    text="Galery Imaj"
                  />

                  <AccordionPanelStyled>
                    <ImageGallery />
                  </AccordionPanelStyled>
                </>
              )}
            </AccordionItem>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionHeaderStyled
                    isExpanded={isExpanded}
                    text="Aksyon"
                  />

                  <AccordionPanelStyled>
                    <Box paddingY="4">
                      <Actions onClick={actionClick} />
                    </Box>
                  </AccordionPanelStyled>
                </>
              )}
            </AccordionItem>
          </StickWrapper>
        </Box>
      </Flex>
    </Box>
  );
};

ArticleCompositor.propTypes = {
  article: T.object.isRequired,
  onComplete: T.func.isRequired,
  autoSave: T.func.isRequired,
};
