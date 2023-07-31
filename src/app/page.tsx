"use client";

import { Main, Title, Button } from "@/app/page.style";
import { useEffect, useState } from "react";
import { kakaoInit } from "../../utils/kakaoInit";
import Router from "next/router";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const CLIENT_ID = process.env.REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REDIRECT_URI;

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const kakaoLogin = () =>
    (window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`);

  return isLoading ? (
    <>
      <Main>
        <Title>MATE</Title>
        <Button onClick={kakaoLogin}>카카오톡으로 로그인하기</Button>
      </Main>
    </>
  ) : null;
}
