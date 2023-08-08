"use client";

// 클라이언트 소켓
import { io as ClientIO } from "socket.io-client";
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
  const sendApiSocketChat = async (chatMessage: IChatMessage): Promise<Response> => {
    return await fetch("/api/socket/chat", {
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
    // socket.io 서버와 연결
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    // on 이란?
    // 클라이언트 또는 서버에서 이벤트에 대한 리스너를 등록하는 데 사용.
    // 이벤트 이름과 이벤트를 처리하기 위한 콜백 함수라는 두 가지 이상의 인수가 필요합니다.

    // 클라이언트에서 서버로 보낼때 on 이벤트이름과 emit 이벤트 이름이 일치해야한다
    // 클라이언트랑 서버랑 이벤트를 등록해서 통신
    // connect는 원래 있는 이벤트

    // 간단하게 말해서 emit()에서 이벤트를 발생시키면 콜백함수로 socket.on()이 일어남
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // 발송된 새 메시지에 대한 채팅내용 업데이트
    // 이 이벤트를 등록 함으로써 누군가가 메시지를 보내면 chat.api에서 emit("message")를 실행한다
    socket.on("message", (message: IChatMessage) => {
      chatMessages.push(message);
      setChatMessages([...chatMessages]);
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
    });

    // 소켓이 이미 존재하는 경우 disconnet
    if (socket) return () => socket.disconnect();
  }, []);
  console.log(chatMessages);
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
