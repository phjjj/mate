"use client";

import { styled } from "styled-components";

export const Main = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 56px; // 56px 하는 이유가 내비바랑 선이 안맞아서
  left: 0;
  right: 0;
  bottom: 0;
`;
export const TitleBox = styled.h2`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #000;
  text-align: center;
  font-family: Archivo Black;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.667px;
  text-transform: uppercase;
`;
