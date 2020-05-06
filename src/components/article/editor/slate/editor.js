import React, { useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import flowRight from "lodash.flowright";
import { Box } from "@chakra-ui/core";
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

export const Editor = ({ contentRef, initialValue }) => {
  const [value, setValue] = useState(initialValue);

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

  return (
    <Box
      border="1px"
      borderColor="gray.400"
      borderRadius="md"
      backgroundColor="#fbfbfb"
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(_value) => {
          if (contentRef) {
            contentRef.current = _value;
          }
          setValue(_value);
        }}
      >
        <Toolbar />
        <Box width="full" padding="4" className="me">
          <Editable
            // readOnly={isLoading}
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
  );
};
