"use client";
import { styled } from "styled-components";

export const Header = styled.header`
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
