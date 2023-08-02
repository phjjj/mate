import { CgProfile } from "react-icons/cg";

import { Header } from "./page.style";

import Form from "@/app/components/Form/Form";

export default function New() {
  return (
    <Header>
      <div className="title__container">
        <span className="profile__svg">
          <CgProfile size={29} color="0084FF" />
        </span>
        <h2>채팅방 만들기</h2>
      </div>
      <Form />
    </Header>
  );
}
