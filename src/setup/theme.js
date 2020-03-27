import { theme as chakraTheme } from "@chakra-ui/core";

export const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `"Muli", sans-serif`,
    heading: `"Sen", sans-serif`,
    mono: "PT Mono, monospace",
  },
};
