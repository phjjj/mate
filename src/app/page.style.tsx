import { styled } from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: #74b9ff;
  height: 100vh;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  align-items: center;
  gap: 600px;
  overflow: auto;
`;

export const Title = styled.main`
  color: #fff;
  font-size: 58px;
  font-weight: 400;
  padding-top: 100px;
`;

export const Button = styled.button`
  display: flex;
  width: 312px;
  height: 52px;
  background-color: #fff;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: none;
`;
