import React from "react";
import T from "prop-types";

import { Button, SimpleGrid } from "@chakra-ui/core";

const list = [
  {
    name: "save",
    text: "Anrejistre Bouyon",
    color: "yellow",
    action: "onSave",
  },
  {
    name: "review",
    text: "Voye nan revizyon",
    color: "teal",
    action: "onReview",
  },
  { name: "publish", text: "Pibliye", color: "green", action: "onPublish" },
  {
    name: "delete",
    text: "Efase atik la nèt",
    color: "red",
    action: "onDelete",
  },
];

export const Actions = ({ onClick, actions }) => (
  <SimpleGrid gridRowGap="8" columns="2" gridColumnGap="8">
    {list.map(({ name, color, text, action, ...rest }) => (
      <Button
        key={`editor-action-${name}`}
        variantColor={color}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          actions[action]();
        }}
        {...rest}
      >
        {text}
      </Button>
    ))}
  </SimpleGrid>
);

Actions.propTypes = {
  onClick: T.func.isRequired,
};
