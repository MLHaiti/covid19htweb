import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/core";
import { mutate } from "swr";
import { useScrollTop } from "utils/hooks/ui";

export const StickWrapper = ({
  children,
  scrollTopKey,
  targetName,
  backgroundColor = "#ffffff",
  ...rest
}) => {
  const barInfo = useRef({ top: 0, width: 676, height: 57 });
  const { scrollTop } = useScrollTop(scrollTopKey);
  const fixed = scrollTop > barInfo.current.top;

  const targetId = `sticky-${targetName}`;

  useEffect(() => {
    const size = (el) => el.getBoundingClientRect();
    const toolbar = size(document.getElementById(targetId));
    const { top, height, left, width } = toolbar;

    barInfo.current = { top, height, left, width };
    return () => {
      mutate(targetId, { height: 0, top: 0 });
    };
  }, []);

  return (
    <>
      <Box
        height={`${barInfo.current.height}px`}
        width={`${barInfo.current.width}px`}
        display={fixed ? "block" : "none"}
        backgroundColor={backgroundColor}
        transition="all 0.5s"
      />
      <Box
        position={fixed ? "fixed" : "static"}
        top={0}
        id={targetId}
        backgroundColor={backgroundColor}
        transition="all 0.5s"
        zIndex={1}
        // opacity={0}
        {...rest}
      >
        {children}
      </Box>
    </>
  );
};
