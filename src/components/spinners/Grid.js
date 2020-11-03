import React from "react";
import { keyframes } from "@emotion/core";
import styled from "@emotion/styled";

const motion = keyframes`
0%, 100% {
  opacity: 1;
}
50% {
  opacity: 0.5;
}
`;

const DefaultSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: ${(p) => `${p.size}${p.sizeUnit}`};
  height: ${(p) => `${p.size}${p.sizeUnit}`};
  div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(p) => p.color};
    animation: ${motion} 1.2s linear infinite;
  }
  div:nth-child(1) {
    top: 6px;
    left: 6px;
    animation-delay: 0s;
  }
  div:nth-child(2) {
    top: 6px;
    left: 26px;
    animation-delay: -0.4s;
  }
  div:nth-child(3) {
    top: 6px;
    left: 45px;
    animation-delay: -0.8s;
  }
  div:nth-child(4) {
    top: 26px;
    left: 6px;
    animation-delay: -0.4s;
  }
  div:nth-child(5) {
    top: 26px;
    left: 26px;
    animation-delay: -0.8s;
  }
  div:nth-child(6) {
    top: 26px;
    left: 45px;
    animation-delay: -1.2s;
  }
  div:nth-child(7) {
    top: 45px;
    left: 6px;
    animation-delay: -0.8s;
  }
  div:nth-child(8) {
    top: 45px;
    left: 26px;
    animation-delay: -1.2s;
  }
  div:nth-child(9) {
    top: 45px;
    left: 45px;
    animation-delay: -1.6s;
  }
`;

export const Grid = ({ color, size, sizeUnit }) => (
  <DefaultSpinner color={color} size={size} sizeUnit={sizeUnit}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </DefaultSpinner>
);

Grid.defaultProps = {
  size: 64,
  color: "#00bfff",
  sizeUnit: "px",
};
