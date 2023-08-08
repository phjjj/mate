import { CgProfile } from "react-icons/cg";
import { Header } from "./page.style";
import Form from "@/src/app/_components/ChatCreateForm/Form";

export default function New() {
  return (
    <Header>
      <div className="title__container">
        <h2>채팅방 만들기</h2>
      </div>
      <Form />
    </Header>
  );
}
