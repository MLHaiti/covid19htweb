import React, { useState } from "react";
import { Box, Heading, Text, Button, Stack, Image } from "@chakra-ui/core";
import { UppyModal } from "components";

export const ImageGallery = () => {
  const [images, setImages] = useState([]);

  return (
    <Box marginBottom="8">
      <Text fontSize="xs">
        Ajoute imaj si li pote yon diplis nan konpreyansyon sijè a.
      </Text>
      <Stack>
        {images.map(({ src }) => (
          <Image src={src} key={src} />
        ))}
      </Stack>
      <UppyModal
        onModalClose={(data) => {
          if (Array.isArray(data) && data.length > 0) {
            setImages([...images, { src: data.uploadURL, type: data.type }]);
          }
        }}
        id="uppy-article-gallery"
        headerText="Imaj kouvèti"
        OpenElement={({ onOpen }) => (
          <Button
            size="md"
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
  );
};
