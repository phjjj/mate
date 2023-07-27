"use client";

import { useEffect, useState } from "react";
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
  Main,
  TitleBox,
  UserImg,
  UserInfoBox,
  UserNameText,
  UsersNumberSpan,
} from "./page.style";
import { BsArrowRightCircle, BsFillBookmarkFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Link from "next/link";
export default function ChatList() {
  // 유저데이터
  const user = [{ name: "박해준" }];
  // 채팅방 임시 데이터
  const chatList = [
    {
      title: "경운대",
      departures: "인동",
      departuresTime: "09:00",
      destination: "경운대학교",
      destinationTime: "09:20",
      people: 4,
      host: "손민석",
    },
    {
      title: "어디가실래요",
      departures: "옥계",
      departuresTime: "09:00",
      destination: "경운대학교",
      destinationTime: "09:20",
      people: 2,
      host: "박해준",
    },
    {
      title: "같이가요",
      departures: "인동",
      departuresTime: "08:00",
      destination: "경운대학교",
      destinationTime: "09:00",
      people: 4,
      host: "김지섭",
    },
    {
      title: "같이가요",
      departures: "인동",
      departuresTime: "08:00",
      destination: "경운대학교",
      destinationTime: "09:00",
      people: 4,
      host: "김지섭",
    },
    {
      title: "같이가요",
      departures: "인동",
      departuresTime: "08:00",
      destination: "경운대학교",
      destinationTime: "09:00",
      people: 4,
      host: "김지섭",
    },
    {
      title: "같이가요",
      departures: "인동",
      departuresTime: "08:00",
      destination: "경운대학교",
      destinationTime: "09:00",
      people: 4,
      host: "김지",
    },
    {
      title: "같이가요",
      departures: "인동",
      departuresTime: "08:00",
      destination: "경운대학교",
      destinationTime: "09:00",
      people: 4,
      host: "김",
    },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <Main>
      <TitleBox>채팅방목록</TitleBox>
      <Box>
        <List>
          {chatList.map((item, idx) => {
            return (
              <Item key={idx}>
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
                    <UserImg />
                    <UserNameText>{item.host}</UserNameText>
                  </UserInfoBox>
                  <UsersNumberSpan>{item.people}/5</UsersNumberSpan>
                </ChatInfoBox2>
              </Item>
            );
          })}
        </List>
        <Link href={"chatlist/new"}>
          <AiOutlinePlusCircle className="button" />
        </Link>
      </Box>
    </Main>
  ) : null;
}
