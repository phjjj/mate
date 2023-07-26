"use client";
import { styled } from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  gap: 500px;
  height: 100%;
`;

export const Title = styled.main`
  display: flex;
  color: #fff;
  font-size: 58px;
  font-weight: 400;
  padding-top: 100px;
`;

export const Button = styled.button`
  display: flex;
  width: 312px;
  min-height: 52px;
  background-color: #fff;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;
