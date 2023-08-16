"use client";

// 클라이언트 소켓
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Chatting,
  ChattingContentBox,
  Input,
  InputBox,
  Main,
  NameSpan,
  TitleBox,
  MessageSpan,
  ProfileImg,
  MessageBox,
  SendMessageSpan,
} from "./page.style";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useParams } from "next/navigation";

// 메세지 타입
interface IChatMessage {
  username: String | undefined;
  message: String;
  profileImg: String | undefined;
  createdAt: String;
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

  // DB에서 해당 채팅방 메시지 리스트 불러오기
  const getMessageList = async () => {
    const res = await axios.get(`/api/chats/${id}`);
    setTitle(res.data.title);
    setChatMessages(res.data.messageList);
    console.log(res);
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
      const createdAt = currentDate();
      const chatMessage: IChatMessage = {
        username: session?.user.name,
        profileImg: session?.user.image,
        message: messageInput,
        createdAt,
      };

      setMessageInput("");
      socket.emit("message", chatMessage);

      await axios.patch("/api/chats", {
        messageList: {
          username: chatMessage.username,
          message: chatMessage.message,
          createdAt,
          profileImg: chatMessage.profileImg,
        },
        id,
      });

      // setChatMessages((prev) => [...prev, chatMessage]); // 이 코드를 사용하니까 실시간 채팅이 안되더라고 주석 처리 했어.
      console.log("chat messages : ", chatMessages);
    }
    // 아무것도 입력안하면 input창 포커스
    (inputRef?.current as any).focus();
  };

  return (
    <Main>
      <TitleBox>{title}</TitleBox>
      <ChattingContentBox ref={scrollRef as any}>
        {chatMessages.map((chatMessage, i) =>
          chatMessage.username === session?.user.name ? (
            <Chatting flexdirection="row-reverse" key={"_msg" + i}>
              <MessageBox>
                <SendMessageSpan>{chatMessage.message}</SendMessageSpan>
              </MessageBox>
            </Chatting>
          ) : (
            <Chatting flexdirection="row" key={"_msg" + i}>
              <ProfileImg src={chatMessage.profileImg as any} />
              <MessageBox>
                <NameSpan>{`${chatMessage.username}`}</NameSpan>
                <MessageSpan>{chatMessage.message}</MessageSpan>
              </MessageBox>
            </Chatting>
          )
        )}
      </ChattingContentBox>
      <InputBox>
        <Input
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
          전송
        </Button>
      </InputBox>
    </Main>
  );
};

export default page;
