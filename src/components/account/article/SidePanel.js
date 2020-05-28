import React, { useEffect } from "react";
import T from "prop-types";
import {
  Box,
  Flex,
  Text,
  FormLabel,
  Button,
  Accordion,
  AccordionItem,
  Switch,
} from "@chakra-ui/core";
import { StickWrapper } from "components/sticky-wrapper";
import { ImageGallery } from "components/account/article/image-gallery";
import { Actions } from "./action-button";
import { AccordionHeaderStyled, AccordionPanelStyled } from "./components";
import { CoverImage } from "./cover-image";

let autoSaveInterval = null;

const toImplement = () => {
  throw new Error("You forget to implement this feature");
};

export const SidePanel = ({
  onActionClick = () => {},
  onSave = () => {},
  onToggleMode = () => {},
}) => {
  useEffect(
    () => () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    },
    []
  );

  return (
    <StickWrapper
      scrollTopKey="articleEditorScrollTop"
      targetName="articleEditorActions"
    >
      <Accordion allowToggle defaultIndex={[0]}>
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
                          autoSaveInterval = setInterval(onSave, 2000);
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
                    onClick={onToggleMode}
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
            <AccordionHeaderStyled isExpanded={isExpanded} text="Galery Imaj" />

            <AccordionPanelStyled>
              <ImageGallery />
            </AccordionPanelStyled>
          </>
        )}
      </AccordionItem>

      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <AccordionHeaderStyled isExpanded={isExpanded} text="Aksyon" />

            <AccordionPanelStyled>
              <Box paddingY="4">
                <Actions
                  onClick={onActionClick}
                  actions={{
                    onSave,
                    onReview: toImplement,
                    onPublish: toImplement,
                    onDelete: toImplement,
                  }}
                />
              </Box>
            </AccordionPanelStyled>
          </>
        )}
      </AccordionItem>
    </StickWrapper>
  );
};
SidePanel.propTypes = {
  onActionClick: T.func.isRequired,
  onSave: T.func.isRequired,
  onToggleMode: T.func.isRequired,
};
