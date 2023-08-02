import { Main, TitleBox } from "./page.style";
import { Chat } from "@/app/components/ChatComponent/ChatComponent";
export default function ChatList() {
  return (
    <Main>
      <TitleBox>채팅방목록</TitleBox>
      <Chat />
    </Main>
  );
}
