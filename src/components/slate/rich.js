import React, { useCallback, useMemo, useState } from "react";
import { Box } from "@chakra-ui/core";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import flowRight from "lodash.flowright";
import { Toolbar } from "./basics";
import { handleHotKeys, withImages, withLinks } from "./helpers";
import {
  BlockButton,
  MarkButton,
  LinkButton,
  ImageButton,
  Element,
  Leaf,
} from "./components";

import { initialValue } from "./test-value";

const flow = flowRight([withLinks, withImages, withHistory, withReact]);

const RichEditor = () => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    // () => withImages(withHistory(withReact(createEditor()))),
    () => flow(createEditor()),
    []
  );

  const hotKeysHandler = useMemo(() => handleHotKeys(editor), [editor]);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar>
        <Box>dfs</Box>
        <Box>dfs</Box>
        {/* <BlockButton format="heading-one" />
        <BlockButton format="heading-two" />

        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />

        <BlockButton format="block-quote" />
        <BlockButton format="numbered-list" />
        <BlockButton format="bulleted-list" />

        <LinkButton />
        <ImageButton />
        <MarkButton format="mark" /> */}
        {/* <MarkButton format="code" /> */}
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={hotKeysHandler}
      />
    </Slate>
  );
};

export default RichEditor;
