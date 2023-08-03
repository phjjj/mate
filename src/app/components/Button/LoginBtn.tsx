"use client";

import React from "react";
import { Button } from "./LoginBtn.stye";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

declare module "next-auth" {
  interface Session {
    user: {
      id: any;
      name: String;
      email: String;
      kakaoId: Number;
      image: String;
    };
    expires: string;
  }
}

const LoginBtn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const loginHandler = async () => {
    await signIn("kakao", { callbackUrl: `/chatlist` });
  };

  session && router.push("/chatlist");

  return (
    <Button type="button" onClick={loginHandler}>
      카카오톡으로 로그인하기
    </Button>
  );
};

export default LoginBtn;
