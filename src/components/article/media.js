import React from "react";
import { Box, Heading, Image as CImage } from "@chakra-ui/core";

export const Image = React.forwardRef(({ src, alt, ...rest }, ref) => (
  <CImage
    ref={ref}
    src={src}
    alt={alt || "Content Image"}
    objectFit="cover"
    maxWidth="100%"
    maxHeight="20em"
    {...rest}
  />
));
