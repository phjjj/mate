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

  const socket = io("http://localhost:3001");

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
