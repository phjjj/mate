"use client";

import styled from "styled-components";
import { Button } from "@/src/app/_components/Button/LoginBtn.style";
export const Main = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Title = styled.div`
  text-align: center;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 20px;
`;
export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const UserImg = styled.img`
  background-color: grey;
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;
export const UserNameSpan = styled.span`
  color: #000;
  text-align: center;
  font-family: Comfortaa;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.54px;
`;
export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 100px;
  a {
    text-decoration-line: none;
  }
`;
export const HomeButton = styled(Button)`
  margin-bottom: 30px;
`;
export const RedButton = styled(Button)`
  color: red;
`;
