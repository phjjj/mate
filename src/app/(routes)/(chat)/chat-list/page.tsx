import { Main, TitleBox } from "./page.style";
import { ChatListContainer } from "@/app/_components/ChatList/ChatListContainer";

export default function ChatList() {
  return (
    <Main>
      <TitleBox>채팅방목록</TitleBox>
      <ChatListContainer />
    </Main>
  );
}
