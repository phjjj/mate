"use client";
import { CgProfile } from "react-icons/cg";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  ButtonContainer,
  ChatTitleInput,
  Form,
  Header,
  Input,
  InputContainer,
} from "./page.style";

export default function New() {
  return (
    <>
      <Header>
        <div className="title__container">
          <span className="profile__svg">
            <CgProfile size={29} color="0084FF" />
          </span>
          <h2>채팅방 만들기</h2>
        </div>
      </Header>
      <Form>
        <ChatTitleInput placeholder=" 채팅방 이름을 입력해주세요." />
        <label>출발지와 도착지를 설정해주세요.</label>
        <InputContainer>
          <Input placeholder="출발지" />
          <BsArrowRightCircle size={23} />
          <Input placeholder="도착지" />
        </InputContainer>
        <label>출발시간과 도착시간을 설정해주세요.</label>
        <InputContainer>
          <Input placeholder="출발시간" />
          <BsArrowRightCircle size={23} />
          <Input placeholder="도착시간" />
        </InputContainer>
        <label>인원수를 설정해주세요.</label>
        <div>
          <Input placeholder="인원" type="number" />
        </div>
        <ButtonContainer>
          <button>취소</button>
          <button>생성하기</button>
        </ButtonContainer>
      </Form>
    </>
  );
}
