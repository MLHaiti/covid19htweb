import React, { useEffect, useState, useRef } from "react";
import T from "prop-types";
import { Box, Flex } from "@chakra-ui/core";

export const Header = ({ children }) => {
  const [pageYOffset, setPageYOffset] = useState(0);

  const top = useRef(0);

  const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nextValue = window.pageYOffset;

    setPageYOffset((value) => {
      let _top = top.current + (value - nextValue);
      if (_top > 0) {
        _top = 0;
      }

      if (_top < -64) {
        _top = -64;
      }

      top.current = _top;
      return nextValue;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sticky = pageYOffset !== 0;

  return (
    <>
      <Box display={sticky ? "block" : "none"} width="full" height="16" />
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        height="16"
        paddingY="6"
        paddingX="4"
        width="full"
        transition=" .2s ease"
        backgroundColor="hsla(0,0%,100%,.98)"
        boxShadow={sticky ? "none" : "0 0 48px rgba(50,76,128,.05)"}
        position={sticky ? "fixed" : "static"}
        zIndex={sticky ? 10 : "auto"}
        top={top.current}
      >
        {children}
      </Flex>
    </>
  );
};

Header.propTypes = {
  children: T.node.isRequired,
};
