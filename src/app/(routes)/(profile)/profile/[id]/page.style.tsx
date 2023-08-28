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
// 자기소개 부분
export const IntroductionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 312px;
  height: 200px;
  gap: 15px;
  font-size: 12px;
  color: #8f8f8f;
`;
export const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const IntroParagraph = styled.p`
  background-color: white;
  color: #000;
  font-style: normal;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.27px;
  border-radius: 10px;
  height: 80px;
  padding: 5px;
`;
export const CarInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const CarImg = styled.img`
  background-color: cadetblue;
  height: 70px;
  width: 70px;
  border-radius: 11px;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 50px;
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

export const UserUpdateBtn = styled.button`
  background-color: #c3c3c3;
  border: none;
  cursor: pointer;
  font-size: 12px;
  height: 25px;
  border-radius: 10px;
`;
