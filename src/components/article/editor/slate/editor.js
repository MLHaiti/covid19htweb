import React, { useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import flowRight from "lodash.flowright";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/core";
import { handleHotKeys } from "./helpers";
import { withLinks } from "./withLinks";
import { withImages } from "./withImages";
import { withTests } from "./withTests";
import { Toolbar } from "./toolbar";

import { element, leaf } from "./components";

const flow = flowRight([
  withImages,
  withLinks,
  withTests,
  withHistory,
  withReact,
]);

export const Editor = ({ title = "", content = initialValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [_title, setTitle] = useState(title);
  const [value, setValue] = useState(content);

  const editor = useMemo(() => flow(createEditor()), []);

  const KeysHandler = useCallback(
    (event) => {
      handleHotKeys(event, editor);
      if (event.defaultPrevented) {
      }
    },
    [editor]
  );

  const renderElement = useCallback(element, []);
  const renderLeaf = useCallback(leaf, []);

  const handleTitle = (event) => setTitle(event.target.value);

  return (
    <Box maxWidth="732px">
      <form>
        <FormControl marginBottom="8">
          <FormLabel htmlFor="title">Tik atik la</FormLabel>
          <Input
            id="title"
            aria-describedby="title-helper-text"
            placeholder="Tik atik la"
            size="md"
            value={_title}
            onChange={handleTitle}
          />
          <FormHelperText id="title-helper-text">
            Genbe tit la kout epi eksplisit
          </FormHelperText>
        </FormControl>
      </form>
      <Box
        border="1px"
        borderColor="gray.400"
        borderRadius="md"
        backgroundColor="#fbfbfb"
      >
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Toolbar />
          <Box width="full" padding="4">
            <Editable
              readOnly={isLoading}
              spellCheck
              autoFocus
              onKeyDown={KeysHandler}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Ekri Atik ou a la."
            />
          </Box>
        </Slate>
      </Box>
      <Box marginY="8">
        <Button
          loadingText="Nap anrejistre li"
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              console.log(value);
              setIsLoading(false);
            }, 3000);
          }}
          variantColor="green"
        >
          Anrejistre
        </Button>
      </Box>
    </Box>
  );
};

// const initialValue = [
//   {
//     children: [{ text: "" }],
//   },
// ];

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "An opening paragraph..." }],
  },
  {
    type: "quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "A closing paragraph!" }],
  },
];
