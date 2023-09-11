import styled from "styled-components";

export const Wraaper = styled.nav`
  display: flex;
  position: relative;
  width: 100%;
  background-color: #74b9ff;
  height: 56px;
  margin-bottom: auto;
`;

export const BtnBox = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 0;
  gap: 20px;
  a {
    color: white;
  }
`;
