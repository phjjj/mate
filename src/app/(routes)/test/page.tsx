"use client";

// 클라이언트 소켓
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { Box } from "./page.style";
import { useSession } from "next-auth/react";
import axios from "axios";

// 메세지 타입
interface IChatMessage {
  username: String | undefined;
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

  const socket = io("http://localhost:3001");

  // DB에서 해당 채팅방 메시지 리스트 불러오기
  const getMessageList = async () => {
    const res = await axios.get(`/api/chats/64d2017846ab7d66be19fc36`);

    console.log("get message list res : ", res.data.messageList);
    setChatMessages(res.data.messageList);
  };

  useEffect((): any => {
    getMessageList();
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message) => {
      chatMessages.push(message);
      setChatMessages((prev) => [...chatMessages]);
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
      const chatMessage: IChatMessage = {
        username: session?.user.name,
        message: messageInput,
      };

      const createdAt = currentDate();

      setMessageInput("");
      socket.emit("message", chatMessage);

      setChatMessages((prev) => [...prev, chatMessage]);

      await axios.patch("/api/chats", {
        messageList: { ...chatMessage, createdAt },
        id: "64d2017846ab7d66be19fc36",
      });
    }
    // 아무것도 입력안하면 input창 포커스
    (inputRef?.current as any).focus();
  };

  return (
    <Box>
      {chatMessages.length ? (
        chatMessages.map((chatMessage, i) => (
          <div key={"msg_" + i}>
            <span>{chatMessage.username === session?.user.name ? "[Me]" : `[${chatMessage.username}]`}</span>:{" "}
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
