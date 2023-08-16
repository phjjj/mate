import { styled } from "styled-components";
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  overflow: hidden;
  height: 100%;
`;
export const TitleBox = styled.h2`
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
export const ChattingContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  overflow: scroll;
  border-top: 0.1px solid;
  margin-top: 20px;
  margin-bottom: -20px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Chatting = styled.div<{ flexdirection: string }>`
  display: flex;
  flex-direction: ${(props) => props.flexdirection};
  gap: 10px;

  margin: 2px;
`;
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
// 메시지,이름 박스
export const MessageBox = styled.div``;

export const NameSpan = styled.span`
  display: flex;
  font-size: 12px;
`;

export const SendMessageSpan = styled.span`
  display: flex;
  position: relative;
  background: white;
  border-radius: 0.4em;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  padding: 5px;
  margin-right: 10px;
  min-height: 10px;
  min-width: 10px;
`;
export const MessageSpan = styled.span`
  display: flex;
  position: relative;
  background: white;
  border-radius: 0.4em;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  margin-left: 2px;
  margin-top: 5px;
  padding: 5px;
  min-height: 10px;
  min-width: 10px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 41%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-right-color: white;
    border-left: 0;
    border-top: 0;
    margin-top: -4px;
    margin-left: -8.5px;
  }
`;

export const InputBox = styled.div`
  display: flex;
  width: 100vw;
  min-height: 70px;
  position: fixed;
  bottom: 0;
`;

export const Input = styled.input`
  display: flex;
  width: 90vw;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "#B4B4B4" : "#4E6AFF")};
  color: ${(props) => (props.disabled ? "#797575" : "white")};
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  width: 20%;
`;
