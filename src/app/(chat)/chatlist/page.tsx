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
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function ChatList() {
  const params = useSearchParams();
  let id;

  for (const [key, value] of params.entries()) {
    id = value;
  }

  // 유저데이터
  //const user = [{ name: "박해준" }];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatList, setChatList] = useState([]);

  const getChatList = async () => {
    const res = await axios.get("/api/chats");
    setChatList(res.data.chats);
  };

  useEffect(() => {
    getChatList();
    setIsLoading(true);
  }, []);

  return isLoading ? (
    <Main>
      <TitleBox>채팅방목록</TitleBox>
      <Box>
        <List>
          {chatList.map((item: any, idx) => {
            return (
              <Item key={idx}>
                <BsFillBookmarkFill className="mark" />
                <ItemTitleBox>{item.title}</ItemTitleBox>
                <ChatInfoBox>
                  <DeparturesInfoBox>
                    <DeparturesText>{item.departures}</DeparturesText>
                    <DeparturesTimeSpan>{item.departureTime}</DeparturesTimeSpan>
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
        <Link href={`chatlist/new?id=${id}`}>
          <AiOutlinePlusCircle className="button" />
        </Link>
      </Box>
    </Main>
  ) : null;
}
