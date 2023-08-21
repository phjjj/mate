"use client";

// 클라이언트 소켓
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Chatting,
  ContentsBox,
  Input,
  InputBox,
  Main,
  NameSpan,
  TitleBox,
  ChatBox,
  MessageSpan,
  ProfileImg,
  MessageBox,
  TimeSpan,
  SendMessageSpan,
} from "./page.style";
import { useSession } from "next-auth/react";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { BsArrowRightCircle } from "react-icons/bs";

// 메세지 타입
interface IChatMessage {
  user: Iuser;
  message: String;
  createdAt: String;
  profileImage: any;
  name: any;
}
// 메세지 안에 들어가는 유저타입
interface Iuser {
  _id: string;
  profileImage: any;
  name: any;
}
const page = () => {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const { data: session } = useSession();
  // connected flag
  const [connected, setConnected] = useState<Boolean>(false);
  // 채팅 및 메시지 초기화 (chatMessages 안에 대화 내용들이 다 들어감)
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [title, setTitle] = useState("");
  const { id } = useParams() as { id: string };
  const socket = io("https://jweather.site", {
    auth: { id },
  });

  // 세션이 없으면 로그인 창으로 리다이렉트
  // if (session === null) {
  //   redirect("/");
  // }

  // DB에서 해당 채팅방 메시지 리스트 불러오기
  const getMessageList = async () => {
    const res = await axios.get(`/api/chats/${id}`);
    setTitle(res?.data?.title);
    setChatMessages(res?.data?.messageList);
  };

  // useEffect 분리 한 이유는 소켓에서 메시지 받을때마다 geMessageList 함수 호출 하므로 분리했음.
  useEffect(() => {
    getMessageList();
  }, []);

  // 렌더링 될때마다 스크롤 맨 아래로 되게 하기
  useEffect(() => {
    (scrollRef.current as any).scrollTop = (scrollRef.current as any).scrollHeight;
  });

  useEffect((): any => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("message", (message) => {
      // chatMessages.push(message);

      setChatMessages((prev) => [...prev, message]);
    });
  }, []);

  // 채팅 보낸 시간 구해주는 함수
  const currentDate = () => {
    const date = new Date();
    const currentedAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date
      .toTimeString()
      .slice(0, 8)}`;

    return currentedAt;
  };

  // 메시지 전송 시 함수
  const sendMessage = async () => {
    if (messageInput) {
      const createdAt = new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "numeric" });
      const chatMessage: IChatMessage = {
        user: session?.user.id,
        message: messageInput,
        profileImage: session?.user.image,
        name: session?.user.name,
        createdAt,
      };

      setMessageInput("");
      socket.emit("message", chatMessage);

      await axios.patch("/api/chats", {
        messageList: chatMessage,
        id,
      });

      // setChatMessages((prev) => [...prev, chatMessage]); // 이 코드를 사용하니까 실시간 채팅이 안되더라고 주석 처리 했어.
      // console.log("chat messages : ", chatMessages);
    }
    // 아무것도 입력안하면 input창 포커스
    (inputRef?.current as any).focus();
  };
  return (
    <Main>
      <TitleBox>{title}</TitleBox>
      <ContentsBox>
        <ChatBox ref={scrollRef as any}>
          <ul>
            {chatMessages.map((chatMessage, i) =>
              chatMessage?.user?._id === session?.user.id || chatMessage.user === session?.user.id ? (
                <Chatting flexdirection="row-reverse" key={"_msg" + i}>
                  <MessageBox>
                    <SendMessageSpan>{chatMessage.message}</SendMessageSpan>
                    <TimeSpan textAlign="right" right="100%" left="">
                      {chatMessage.createdAt}
                    </TimeSpan>
                  </MessageBox>
                </Chatting>
              ) : (
                <Chatting flexdirection="row" key={"_msg" + i}>
                  <ProfileImg src={chatMessage.profileImage as any} />
                  <MessageBox>
                    <NameSpan>{`${chatMessage.name}`}</NameSpan>
                    <MessageSpan>{chatMessage.message}</MessageSpan>
                    <TimeSpan textAlign="left" left="100%" right="">
                      {chatMessage.createdAt}
                    </TimeSpan>
                  </MessageBox>
                </Chatting>
              )
            )}
          </ul>
        </ChatBox>
        <InputBox>
          <Input
            placeholder=" 메시지를 입력하세요"
            ref={inputRef}
            type="text"
            value={messageInput}
            disabled={!connected}
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button disabled={messageInput ? false : true} onClick={(e) => sendMessage()}>
            <BsArrowRightCircle fontWeight={20} size={22} />
          </Button>
        </InputBox>
      </ContentsBox>
    </Main>
  );
};

export default page;
