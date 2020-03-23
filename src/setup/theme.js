import { theme as chakraTheme } from "@chakra-ui/core";

export const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `"Hepta Slab", serif`,
    heading: `"IBM Plex Mono", monospace`,
    mono: "Menlo, monospace",
  },
};
