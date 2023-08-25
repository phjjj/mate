"use client";

import Link from "next/link";
import {
  HomeButton,
  ButtonsBox,
  Main,
  ProfileBox,
  Title,
  UserImg,
  UserNameSpan,
  IntroductionBox,
  IntroBox,
  IntroParagraph,
  CarImg,
  CarInfoBox,
} from "../../../profile/[id]/page.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  UserInfoBox,
  UserNameText,
  UsersNumberSpan,
} from "@/src/app/_components/ChatList/ChatListContainer.style";
import { BsArrowRightCircle, BsFillBookFill, BsFillBookmarkFill } from "react-icons/bs";

interface IParams {
  id: String;
}

export default function ChatInfo() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatInfo, setChatInfo] = useState({}) as any;

  const router = useRouter();
  const { id: chatId } = useParams();

  const getChatInfo = async () => {
    const { data } = await axios.get(`/api/chats/${chatId}`);
    setChatInfo(data);
  };

  // 멤버 추가 해주는 함수
  const addMember = async () => {
    // 맴버가 호스트인지 확인
    // 호스트 아니면 멤버 추가 해준다.
    if (!isHost()) {
      const {
        data: { isChatRoom },
      } = await axios.patch(`/api/chats/${chatId}`, { memberId: session?.user.id });
    }
  };

  // 채팅 참여할때 호스트인지 확인 해주는 함수
  const isHost = () => {
    if (chatInfo?.host?._id === session?.user.id) {
      return true;
    }
    return false;
  };

  const isChatRoomMember = () => {
    if (isHost()) {
      return true;
    } else {
      // 유저가 채팅방 만들었으면 다른 채팅방 못들어간다. 반환값는 객체로 반환, 불리언 값으로 반환 하면 해당 채팅방 맴버 참여유무 값이다.

      let isMemberCheck = false;
      // 방에 호스트가 없을경우

      if (chatInfo.host === null) {
        for (let member of chatInfo.member) {
          if (member === session?.user.id) {
            console.log("멤버 있음");
            isMemberCheck = true;
            return isMemberCheck;
          }
        }
        alert("참가할 수 없는 방 입니다.");
        //setModal(false);
        return { isRedirect: false, code: 400 };
      }
      if (chatInfo.host._id === session?.user.id) {
        alert("채팅방 만들었으므로 참여 제한 됩니다");
        //setModal(false);
        return { isRedirect: false, code: 400 };
      }

      for (let member of chatInfo.member) {
        if (member === session?.user.id) {
          console.log("멤버 있음");
          isMemberCheck = true;
          return isMemberCheck;
        }
      }
      // 해당 채팅방 인원 가득 찼는지 확인
      if (chatInfo.member.length + 1 === chatInfo.people) {
        alert("해당 채팅방 인원이 가득 찼습니다");
        //setModal(false);
        return { isRedirect: false, code: 400 };
      }
      return isMemberCheck;
    }
  };

  const redirectChatRoom = async () => {
    const isRedirect = isChatRoomMember();

    if (typeof isRedirect === "boolean") {
      if (isRedirect) {
        router.push(`/chat-room/${chatId}`);
      } else {
        await addMember();
        router.push(`/chat-room/${chatId}`);
      }
    }
  };
  useEffect(() => {
    getChatInfo();
    setIsLoading(false);
  }, []);

  return isLoading ? null : (
    <Main>
      <Title>드라이버 정보</Title>
      <ProfileBox>
        <UserImg src={chatInfo.host?.profileImage} />
        <UserNameSpan>{chatInfo.host?.name}</UserNameSpan>
        <IntroductionBox>
          <IntroBox>
            <span>소개</span>
            <IntroParagraph>{chatInfo?.host?.introduction?.intro}</IntroParagraph>
          </IntroBox>
          <CarInfoBox>
            <span>자동차</span>
            <CarImg src={`${chatInfo?.host?.introduction?.carImage}`} />
          </CarInfoBox>
        </IntroductionBox>
      </ProfileBox>
      <Box>
        <List>
          <Item>
            <BsFillBookmarkFill className="mark" />
            <ItemTitleBox>{chatInfo.title}</ItemTitleBox>
            <ChatInfoBox>
              <DeparturesInfoBox>
                <DeparturesText>{chatInfo.departures}</DeparturesText>
                <DeparturesTimeSpan>{chatInfo.departuresTime}</DeparturesTimeSpan>
              </DeparturesInfoBox>
              <BsArrowRightCircle />
              <DestinationInfoBox>
                <DestinationText>{chatInfo.destination}</DestinationText>
                <DestinationTimeSpan>{chatInfo.destinationTime}</DestinationTimeSpan>
              </DestinationInfoBox>
            </ChatInfoBox>
            <ChatInfoBox2>
              <UserInfoBox>{/* 호스트 유무에 따라 프로필정보, 유저 수 알맞게 수정 */}</UserInfoBox>
              <UsersNumberSpan>
                {chatInfo.host ? chatInfo.member.length + 1 : chatInfo.member?.length}/{chatInfo.people}
              </UsersNumberSpan>
            </ChatInfoBox2>
          </Item>
        </List>
      </Box>
      <ButtonsBox>
        <Link href={""} onClick={redirectChatRoom}>
          <HomeButton>채팅방 입장</HomeButton>
        </Link>
      </ButtonsBox>
    </Main>
  );
}
