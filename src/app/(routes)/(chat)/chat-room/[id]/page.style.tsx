import { styled } from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
`;
export const TitleBox = styled.h2`
  display: flex;
  padding: 10px;
  color: #000;
  margin: 0 auto;
  text-align: center;
  font-family: Archivo Black;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.667px;
  text-transform: uppercase;
`;
export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
`;

export const ChatBox = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
`;

export const Chatting = styled.li<{ flexdirection: string }>`
  display: flex;
  position: relative;
  padding: 8px;
  flex-direction: ${(props) => props.flexdirection};
`;
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: red;
`;
// 메시지,이름 박스
export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 10px;
`;

export const NameSpan = styled.span`
  font-size: 12px;
`;

export const TimeSpan = styled.span<{ left: string; right: string; textAlign: string }>`
  position: absolute;
  font-size: 10px;
  bottom: 0;
  right: ${(props) => props.right};
  text-align: ${(props) => props.textAlign};
  left: ${(props) => props.left};
  min-width: 83px;
  padding: 0 5px 0;
`;

export const SendMessageSpan = styled.span`
  display: flex;
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
  position: relative;
  min-height: 50px;
  padding: 7px 55px 7px 16px;
  box-sizing: border-box;
  background-color: #fff;
`;

export const Input = styled.input`
  overflow-y: auto;
  width: 100%;
  max-height: 57px;
  border: 0 none;
  font-size: 10px;
  line-height: 1.33em;
  background-color: #f5f6f8;
  font-family: Apple SD Gothic Neo, 맑은 고딕, Malgun Gothic, 돋움, dotum, sans-serif;
  resize: none;
  outline: transparent;
  color: #000;
  vertical-align: top;
  border-radius: 20px;
  padding: 9px 70px 7px 10px;
  box-sizing: border-box;
  background-color: #f5f6f8;
`;

export const Button = styled.button`
  position: absolute;
  overflow: hidden;
  height: 36px;
  padding: 0 5px;
  bottom: 10px;
  right: 0;
  margin-right: 12px;
  background-color: #fff;
  border: none;
  color: ${(props) => (props.disabled ? "#797575" : "#4E6AFF")};
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
`;
