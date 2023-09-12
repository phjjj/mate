"use client";
import { styled } from "styled-components";

export const Header = styled.header`
  display: flex;
  position: absolute;
  flex-direction: column;
  overflow: scroll;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  & .title__container {
    height: 7.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & h2 {
      text-align: center;
      font-size: 1.8rem;
    }
    & .profile__svg {
      display: flex;
      justify-content: flex-end;
      margin-right: 1rem;
    }
  }
`;
