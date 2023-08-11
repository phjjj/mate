"use client";

// 클라이언트 소켓
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { Box } from "./page.style";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useParams } from "next/navigation";

// 메세지 타입
interface IChatMessage {
  username: String | undefined;
  message: String;
  createdAt: String;
}

const page = () => {
  const inputRef = useRef(null);
  const { data: session } = useSession();
  // connected flag
  const [connected, setConnected] = useState<Boolean>(false);
  // 채팅 및 메시지 초기화 (chatMessages 안에 대화 내용들이 다 들어감)
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const { id } = useParams() as { id: string };
  const socket = io("ec2-15-164-251-113.ap-northeast-2.compute.amazonaws.com:3001", {
    auth: { id },
  });

  // DB에서 해당 채팅방 메시지 리스트 불러오기
  const getMessageList = async () => {
    const res = await axios.get(`/api/chats/${id}`);

    console.log("get message list res : ", res.data.messageList);
    setChatMessages(res.data.messageList);
  };

  // useEffect 분리 한 이유는 소켓에서 메시지 받을때마다 geMessageList 함수 호출 하므로 분리했음.
  useEffect(() => {
    getMessageList();
  }, []);

  useEffect((): any => {
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      console.log(socket);
      setConnected(true);
    });

    socket.on("message", (message) => {
      // chatMessages.push(message);
      console.log(message);
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
        message: messageInput,
        createdAt,
      };

      setMessageInput("");
      socket.emit("message", chatMessage);

      await axios.patch("/api/chats", {
        messageList: { username: chatMessage.username, message: chatMessage.message, createdAt },
        id,
      });

      // setChatMessages((prev) => [...prev, chatMessage]); // 이 코드를 사용하니까 실시간 채팅이 안되더라고 주석 처리 했어.
      console.log("chat messages : ", chatMessages);
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
