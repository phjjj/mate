"use client";

import Link from "next/link";
import { HomeButton, RedButton, ButtonsBox, Main, ProfileBox, Title, UserImg, UserNameSpan } from "./page.style";
import { useEffect, useState } from "react";

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);
  return isLoading ? (
    <Main>
      <Title>프로필</Title>
      <ProfileBox>
        <UserImg />
        <UserNameSpan>준해박</UserNameSpan>
      </ProfileBox>
      <ButtonsBox>
        <Link href={"/chatlist"}>
          <HomeButton>홈으로</HomeButton>
        </Link>
        <RedButton>로그아웃</RedButton>
        <RedButton>회원탈퇴</RedButton>
      </ButtonsBox>
    </Main>
  ) : null;
}
