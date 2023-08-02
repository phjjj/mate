"use client";

import { styled } from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  gap: 40px;
`;
export const TitleBox = styled.div`
  display: flex;
  margin-top: 50px;
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
export const Box = styled.div`
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    margin: 0 auto;
    margin-top: 50px;

    .button {
      color: white;
      font-size: 50px;
    }
  }
`;
