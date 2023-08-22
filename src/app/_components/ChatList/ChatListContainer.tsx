"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  ChatInfoBox,
  ChatInfoBox2,
  DeparturesInfoBox,
  DeparturesText,
  DeparturesTimeSpan,
  DestinationInfoBox,
  DestinationText,
  DestinationTimeSpan,
  Item,
  ItemTitleBox,
  List,
  UserImg,
  UserInfoBox,
  UserNameText,
  UsersNumberSpan,
} from "./ChatListContainer.style";
import { BsArrowRightCircle, BsFillBookmarkFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Modal, { Backdrop } from "../Modal/Modal";
import { useRouter } from "next/navigation";

export const ChatListContainer = () => {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatList, setChatList] = useState([]);
  const [chatListId, setChatListId] = useState("");
  // const [currentUser, setCurrentUser] = useState({}) as any;
  // 선택한 채팅방
  const [selectChatRoom, setSelectChatRoom] = useState({}) as any;

  const router = useRouter();

  const getChatList = async () => {
    const res = await axios.get("/api/chats");
    setChatList(res.data.chats);
  };

  useEffect(() => {
    getChatList();
    setIsLoading(true);
  }, []);

  // 채팅방 클릭 할때 실행하는 핸들러
  const clickChatList = (id: string, chatRoom: object) => {
    setChatListId(id);
    setSelectChatRoom(chatRoom);
    setModal(true);
  };

  // 채팅 참여할때 호스트인지 확인 해주는 함수
  const isHost = () => {
    if (selectChatRoom?.host?._id === session?.user.id) {
      return true;
    }
    return false;
  };

  // 멤버 추가 해주는 함수
  const addMember = async () => {
    // 맴버가 호스트인지 확인
    // 호스트 아니면 멤버 추가 해준다.
    if (!isHost()) {
      const {
        data: { isChatRoom },
      } = await axios.patch(`/api/chats/${chatListId}`, { memberId: session?.user.id });
    }
  };

  const redirectChatRoom = async () => {
    // 채팅 방 참여 했으므로 멤버 추가
    await addMember();
    router.push(`/chat-room/${chatListId}`);
  };

  /* 채팅방 멤버 접근 권한 수정 할 예정*/

  const isChatRoomMember = () => {
    if (isHost()) {
      return true;
    } else {
      // 유저가 채팅방 만들었으면 다른 채팅방 못들어간다. 반환값는 객체로 반환, 불리언 값으로 반환 하면 해당 채팅방 맴버 참여유무 값이다.
      for (let chat of chatList as any) {
        if (chat.host._id === session?.user.id) {
          alert("채팅방 만들었으므로 참여 제한 됩니다");
          setModal(false);
          return { isRedirect: false, code: 400 };
        }
      }
      let isMemberCheck = false;

      for (let member of selectChatRoom.member) {
        if (member === session?.user.id) {
          console.log("멤버 있음");
          isMemberCheck = true;
          return isMemberCheck;
        }
      }
      // 해당 채팅방 인원 가득 찼는지 확인
      if (selectChatRoom.member.length + 1 === selectChatRoom.people) {
        alert("해당 채팅방 인원이 가득 찼습니다");
        setModal(false);
        return { isRedirect: false, code: 400 };
      }
      return isMemberCheck;
    }
  };

  let showBackdrop;
  let showModal;

  if (modal) {
    const isRedirect = isChatRoomMember();

    if (typeof isRedirect === "boolean") {
      if (!isRedirect) {
        showBackdrop = <Backdrop />;
        showModal = (
          <Modal onClick={() => setModal(false)}>
            <h1>채팅방 입장 하시겠습니까?</h1>
            <div>
              <button onClick={() => setModal(false)}>취소</button>
              <button onClick={redirectChatRoom}>입장</button>
            </div>
          </Modal>
        );
      } else {
        setModal(false);
        router.push(`/chat-room/${chatListId}`);
      }
    }
  }

  // 호스트가 이미 채팅방 참여했는지 확인 해주는 함수
  const createdAtChatRoomHost = async () => {
    try {
      for (let chat of chatList as any) {
        if (chat.host._id === session?.user.id) {
          return false;
        }
      }

      return true;
    } catch (err) {
      console.log("Request isChatRoom Host Error : ", err);
    }
  };

  const linkClickHandler = async () => {
    const isCreatedChatRoom = await createdAtChatRoomHost();
    if (isCreatedChatRoom) {
      router.push(`/chat-create?id=${session?.user?.id}`);
    } else {
      alert("이미 채팅방 만들었습니다.");
    }
  };

  return (
    <>
      {showBackdrop}
      {showModal}
      <Box>
        <List>
          {chatList.map((item: any, idx) => {
            return (
              <Item key={idx} onClick={() => clickChatList(item._id, item)}>
                <BsFillBookmarkFill className="mark" />
                <ItemTitleBox>{item.title}</ItemTitleBox>
                <ChatInfoBox>
                  <DeparturesInfoBox>
                    <DeparturesText>{item.departures}</DeparturesText>
                    <DeparturesTimeSpan>{item.departuresTime}</DeparturesTimeSpan>
                  </DeparturesInfoBox>
                  <BsArrowRightCircle />
                  <DestinationInfoBox>
                    <DestinationText>{item.destination}</DestinationText>
                    <DestinationTimeSpan>{item.destinationTime}</DestinationTimeSpan>
                  </DestinationInfoBox>
                </ChatInfoBox>
                <ChatInfoBox2>
                  <UserInfoBox>
                    <UserImg src={item.host.profileImage} />
                    <UserNameText>{item.host.name}</UserNameText>
                  </UserInfoBox>
                  <UsersNumberSpan>
                    {item.member.length + 1}/{item.people}
                  </UsersNumberSpan>
                </ChatInfoBox2>
              </Item>
            );
          })}
        </List>
        <Link href={""} onClick={linkClickHandler}>
          <AiOutlinePlusCircle className="button" />
        </Link>
      </Box>
    </>
  );
};

export default ChatListContainer;
