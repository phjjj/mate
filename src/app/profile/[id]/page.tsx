"use client";

import Link from "next/link";
import { HomeButton, RedButton, ButtonsBox, Main, ProfileBox, Title, UserImg, UserNameSpan } from "./page.style";
import { useEffect, useState } from "react";
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/atom/atom";
import { resolve } from "path/posix";

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>({});
  const { id } = useParams();
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenState);

  // kakao logout url
  const KAKAO_LOGOUT_URL = `https://kapi.kakao.com/v1/user/logout`;
  const headers: AxiosRequestConfig["headers"] = {
    Authorization: "Bearer " + accessToken,
  };

  const axiosGetReqUser = async () => {
    const {
      data: { user },
    } = await axios.get(`/api/users/profile/${id}`);

    setUser(user);
  };

  // 회원탈퇴 이벤트 핸들러
  const onWithdrawal = async () => {
    await axios.delete(`/api/users/profile/${id}`);
    router.push("/");
  };

  const logout = async () => {
    const res = await axios.post(KAKAO_LOGOUT_URL, {}, { headers });

    if (res.data.id) {
      router.push("/");
    }
  };

  useEffect(() => {
    axiosGetReqUser();
    setIsLoading(false);
  }, []);

  return isLoading ? null : (
    <Main>
      <Title>프로필</Title>
      <ProfileBox>
        <UserImg />
        <UserNameSpan>{user.name}</UserNameSpan>
      </ProfileBox>
      <ButtonsBox>
        <Link href={"/chatlist"}>
          <HomeButton>홈으로</HomeButton>
        </Link>
        <RedButton onClick={logout}>로그아웃</RedButton>
        <RedButton onClick={onWithdrawal}>회원탈퇴</RedButton>
      </ButtonsBox>
    </Main>
  );
}
