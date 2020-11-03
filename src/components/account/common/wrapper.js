import React from "react";
import { Box, Flex } from "@chakra-ui/core";

export default function Wrapper({ children }) {
  const count = React.Children.count(children);

  if (count > 2) {
    throw new Error("This component cannot have more than 2 children");
  }

  if (count === 0) {
    return null;
  }

  if (count === 1) {
    return (
      <>
        <Flex
          direction={{
            base: "column",
            lg: "row",
          }}
        >
          <Box
            width={{
              base: "full",
              lg: "50%",
            }}
          >
            {children}
          </Box>
        </Flex>
      </>
    );
  }

  if (count === 2) {
    return (
      <>
        <Flex
          direction={{
            base: "column",
            lg: "row",
          }}
        >
          <Box
            width={{
              base: "full",
              lg: "50%",
            }}
          >
            {children[0]}
          </Box>
          <Box
            width={{
              base: "full",
              lg: "50%",
            }}
          >
            {children[1]}
          </Box>
        </Flex>
      </>
    );
  }
}
