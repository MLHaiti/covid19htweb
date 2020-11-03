import React, { useState } from "react";
import { Box, Flex, Image, Button, Stack } from "@chakra-ui/core";
import { UppyModal } from "components";

export const CoverImage = ({ imageInfo, onChange }) => {
  const [image, setImage] = useState({});

  return (
    <Box>
      {image ? (
        <Box>
          <Image
            src={image.src || imageInfo.src || "/public/images/338x178.png"}
          />
          <Stack marginTop="4" isInline spacing={12}>
            <UppyModal
              onModalClose={(data) => {
                if (Array.isArray(data) && data.length > 0) {
                  setImage({ src: data.uploadURL, type: data.type });
                }
              }}
              id="uppy-cover"
              headerText="Imaj kouvèti"
              OpenElement={({ onOpen }) => (
                <Button
                  size="sm"
                  variantColor="green"
                  onClick={() => {
                    onOpen();
                  }}
                >
                  Changje imaj la
                </Button>
              )}
            />

            <Button
              marginLeft={12}
              size="sm"
              variantColor="red"
              onClick={() => {
                setImage("");
                onChange();
              }}
            >
              Efase imaj la
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <UppyModal
            onModalClose={(data) => {
              if (Array.isArray(data) && data.length > 0) {
                setImage({ src: data.uploadURL, type: data.type });
              }
            }}
            id="uppy-cover"
            headerText="Imaj kouvèti"
            OpenElement={({ onOpen }) => (
              <Button
                size="sm"
                variantColor="green"
                onClick={() => {
                  onOpen();
                  // setImage("/images/338x178.png");
                  // onChange();
                }}
              >
                Ajoute imaj
              </Button>
            )}
          />
        </Box>
      )}
    </Box>
  );
};
