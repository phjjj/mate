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
import { Box, Item, List } from "@/src/app/_components/ChatList/ChatListContainer.style";
import { BsFillBookmarkFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {
  ChatInfoArea,
  ChatInfoAreaDepartureText,
  ChatInfoAreaDestinationText,
  ChatInfoHeader,
  ChatInfoHeaderTitle,
  ChatInfoPeople,
  ChatInfoPeopleText,
  ChatInfoTime,
} from "./page.style";

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
      <ProfileBox className="chat__info__box">
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
      <Box className="chat__info__box">
        <List>
          <Item className="non-center">
            <ChatInfoHeader>
              <BsFillBookmarkFill className="mark" />
              <ChatInfoHeaderTitle>{chatInfo.title}</ChatInfoHeaderTitle>
            </ChatInfoHeader>
            <ChatInfoTime>
              {/* <DeparturesText>{chatInfo.departures}</DeparturesText> */}
              <CiClock2 size={15} className="clock__icon" /> {chatInfo.departuresTime} 출발 | {chatInfo.destinationTime}{" "}
              도착
              {/* <DestinationText>{chatInfo.destination}</DestinationText>                 */}
            </ChatInfoTime>

            <ChatInfoArea>
              <ChatInfoAreaDepartureText>{chatInfo.departures}</ChatInfoAreaDepartureText>
              <MdKeyboardDoubleArrowRight size={18} />
              <ChatInfoAreaDestinationText>{chatInfo.destination}</ChatInfoAreaDestinationText>
            </ChatInfoArea>
            <ChatInfoPeople>
              <ChatInfoPeopleText>
                현재 인원{chatInfo.host ? chatInfo.member.length + 1 : chatInfo.member?.length}명&nbsp;|&nbsp;
              </ChatInfoPeopleText>
              <ChatInfoPeopleText>총 인원 {chatInfo.people}명</ChatInfoPeopleText>
            </ChatInfoPeople>
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
