import React from "react";
import T from "prop-types";

import { Button, SimpleGrid } from "@chakra-ui/core";

const actions = [
  { name: "save", text: "Anrejistre Bouyon", color: "yellow" },
  { name: "review", text: "Voye nan revizyon", color: "teal" },
  { name: "publish", text: "Pibliye", color: "green" },
  { name: "delete", text: "Efase atik la nèt", color: "red" },
];

export const Actions = ({ onClick }) => (
  <SimpleGrid gridRowGap="8" columns="2" gridColumnGap="8">
    {actions.map(({ name, color, text, ...rest }) => (
      <Button
        key={`editor-action-${name}`}
        variantColor={color}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(name);
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
