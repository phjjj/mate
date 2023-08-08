"use client";
import React from "react";
import { Wraaper } from "./Nav.style";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneHome } from "react-icons/ai";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  // console.log(session);
  return (
    <Wraaper>
      <Link href="/chat-list">
        <AiTwotoneHome size={35} />
      </Link>
      <Link href={`/profile/${session?.user.id}`}>
        <CgProfile size={35} />
      </Link>
    </Wraaper>
  );
};

export default Nav;
