import React from "react";
import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";

const motion = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DualRingSpinner = styled.div`
  display: inline-block;
  width: ${(p) => `${p.width}${p.sizeUnit}`};
  height: ${(p) => `${p.height}${p.sizeUnit}`};
  :after {
    content: " ";
    display: block;
    width: ${(p) => `${p.size}${p.sizeUnit}`};
    height: ${(p) => `${p.size}${p.sizeUnit}`};
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${(p) => p.color};
    border-color: ${(p) => p.color} transparent ${(p) => p.color} transparent;
    animation: ${motion} 1.2s linear infinite;
  }
`;

export const DualRing = ({ color, size, sizeUnit, width, height }) => (
  <DualRingSpinner
    color={color}
    size={size}
    sizeUnit={sizeUnit}
    width={width}
    height={height}
  />
);

DualRing.defaultProps = {
  width: 64,
  height: 64,
  size: 46,
  color: "#00bfff",
  sizeUnit: "px",
};
