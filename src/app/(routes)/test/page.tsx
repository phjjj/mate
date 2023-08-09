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
  const [userNameInput, setUserNameInput] = useState<string>("");
  const [userName, setUserName] = useState<String | undefined>("");

  // 다른 사용자에게 메시지 보내기
  const sendApiSocketChat = async (chatMessage: IChatMessage) => {
    console.log(chatMessage);
    return await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        // 데이터의 type 정보
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatMessage),
    });
  };

  // 메시지 전송 시 함수
  const sendMessage = async () => {
    if (messageInput) {
      const chatMessage: IChatMessage = {
        userName: session?.user.name,
        message: messageInput,
      };
      // resp에 chatMessage(이름, 내용) 저장후 sendApiSocketChat() 인자로 함수 호출
      const resp = await sendApiSocketChat(chatMessage);
      if (resp.ok) setMessageInput("");
    }
    // 아무것도 입력안하면 input창 포커스
    (inputRef?.current as any).focus();
  };

  // 채팅방 입장시
  const sendEnterRoomMessage = async () => {
    // chatMessage를 이용하여 누가 입장했는지 알림
    const chatMessage: IChatMessage = {
      userName: "Bot",
      message: `${userName} enter to chat rooom`,
    };

    // resp에 chatMessage(이름, 내용) 저장후 sendApiSocketChat() 인자로 함수 호출
    const resp = await sendApiSocketChat(chatMessage);

    // res에서 POST가 잘 되지 않았을 경우
    if (!resp.ok) {
      setTimeout(() => {
        sendEnterRoomMessage();
      }, 500);
    }
  };

  // useEffect((): any => {
  //   // 유저이름 입력 완료시
  //   if (userName) {
  //     sendEnterRoomMessage();
  //   }
  // }, [userName]);

  useEffect((): any => {
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message) => {
      chatMessages.push(message);
      setChatMessages([...chatMessages]);
    });
  }, []);

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
