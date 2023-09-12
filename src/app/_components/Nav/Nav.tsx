"use client";
import React from "react";
import { Wraaper, BtnBox } from "./Nav.style";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneHome } from "react-icons/ai";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();

  //세션이 없으면 로그인 창으로 리다이렉트
  if (session === null) {
    redirect("/");
  }

  return (
    <Wraaper>
      <BtnBox>
        <Link href="/chat-list">
          <AiTwotoneHome size={35} />
        </Link>
        <Link href={`/profile/${session?.user.id}`}>
          <CgProfile size={35} />
        </Link>
      </BtnBox>
    </Wraaper>
  );
};

export default Nav;
