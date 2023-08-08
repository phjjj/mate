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
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export const ChatListContainer = () => {
  const { data: session } = useSession();
  console.log(session);
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

  return (
    <Box>
      <List>
        {chatList.map((item: any, idx) => {
          console.log("host : ", item.host);
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
                  <UserNameText>{item.host.name}</UserNameText>
                </UserInfoBox>
                <UsersNumberSpan>{item.people}/5</UsersNumberSpan>
              </ChatInfoBox2>
            </Item>
          );
        })}
      </List>
      <Link href={`chat-create?id=${session?.user?.id}`}>
        <AiOutlinePlusCircle className="button" />
      </Link>
    </Box>
  );
};

export default ChatListContainer;
