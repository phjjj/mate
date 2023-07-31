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

export const Form = styled.form`
  margin: 0 auto;
  width: 80%;
  & label {
    font-size: 0.8rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  padding: 1rem 0.5rem;
  text-align: center;
  width: 80px;
  color: black;
  &:last-child {
  }
  &:focus {
    border-color: white;
    outline: none;
  }
  &::placeholder {
    color: black;
    opacity: 0.4;
  }
`;

export const ChatTitleInput = styled(Input)`
  width: 100%;
  text-align: left;
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  & button {
    width: 100%;
    padding: 0.8rem 2rem;
    border-radius: 0.7rem;
    text-align: center;
    outline: none;
    border: none;
    margin-bottom: 0.8rem;
    &:last-child {
      margin-bottom: 0rem;
    }
  }
`;

export const CreateButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#B4B4B4" : "#4E6AFF")};
  color: ${(props) => (props.disabled ? "black" : "white")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
