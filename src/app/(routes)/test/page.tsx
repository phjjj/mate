"use client";

// 클라이언트 소켓
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { Box } from "./page.style";
import { useSession } from "next-auth/react";

// 메세지 타입
interface IChatMessage {
  userName: String | undefined;
  message: String;
}

const page = () => {
  const inputRef = useRef(null);
  const { data: session } = useSession();
  // connected flag
  const [connected, setConnected] = useState<Boolean>(false);
  // 채팅 및 메시지 초기화 (chatMessages 안에 대화 내용들이 다 들어감)
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  /*
        *채팅방 데이터 보낼 형식
        * 채팅방 라우터 Params id는 방 만든 유저의 id이다.
        ex) "/chatRoom/:hostId"
        1.채팅 방 데이터 형식
        {
          _id : ObjectId, 채팅방 id
          host: ObjectId || Object, 채팅방 호스트(채팅방 만든 유저 관계형, 기본적으로 user _id이다, populate),
          member: Array[ObjectId || Object], 호스트 아닌 유저(관계형)
          messageList: Array[Object], 채팅 메시지
          createdAt: Date, 방생성 시간     
        }

        2.messageList 데이터 형식
        {
          user : ObjectId || Object(채팅 보낸 유저 _id 혹은 보낸 유저 데이터, populate),"이 필드로 자기 메시지 보낸 유저의 이름을 출력"
          message: String,
          createdAt: Date, 메시지 보낸 시간
          
        }
        3.세션을 이용하여 자기자신 아니면 오른쪽으로 메시지 보어주고 남의 메시지는 왼쪽으로 보여준다.
      */
  const socket = io("http://localhost:3001/");

  useEffect((): any => {
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message) => {
      chatMessages.push(message);
      setChatMessages([...chatMessages]);
    });
  }, []);
  // 메시지 전송 시 함수

  const sendMessage = async () => {
    if (messageInput) {
      const chatMessage: IChatMessage = {
        userName: session?.user.name,
        message: messageInput,
      };
      socket.emit("message", chatMessage);
      setMessageInput("");
    }
    // 아무것도 입력안하면 input창 포커스
    (inputRef?.current as any).focus();
  };

  return (
    <Box>
      {chatMessages.length ? (
        chatMessages.map((chatMessage, i) => (
          <div key={"msg_" + i}>
            <span>{chatMessage.userName === session?.user.name ? "[Me]" : `[${chatMessage.userName}]`}</span>:{" "}
            {chatMessage.message}
          </div>
        ))
      ) : (
        <div>No chat messages</div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={messageInput}
        placeholder={connected ? "Type a message..." : "Connecting..."}
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
    </Box>
  );
};

export default page;
