import React from "react";

import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/core";
import { articleTypeInfo } from "./helpers";

export const Separator = () => <Box marginBottom="4">{"\u00a0"}</Box>;

export const ArticleTypeInfo = ({ type }) => (
  <Popover>
    <PopoverTrigger>
      <IconButton
        aria-label="Enfòmasyon sou modèl atik yo"
        icon="info"
        variant="link"
        variantColor="green"
      />
    </PopoverTrigger>
    <PopoverContent zIndex={4}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Diféran modèl atik yo!</PopoverHeader>
      <PopoverBody>
        {articleTypeInfo.map((el) => (
          <Box key={`article-type-${el.value}`}>
            <Heading as="h5" fontSize="md">
              {el.value}
            </Heading>
            <List as="ul" paddingLeft="4" styleType="square">
              {el.labels.map((l) => (
                <ListItem key={`${el.value}-${l}`} fontSize="sm">
                  {l}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </PopoverBody>
    </PopoverContent>
  </Popover>
);
