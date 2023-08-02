"use client";

import React from "react";
import { Button } from "./LoginBtn.stye";
const CLIENT_ID = process.env.REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.REDIRECT_URI;

const kakaoLogin = () =>
  (window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`);

const LoginBtn = () => {
  return <Button onClick={kakaoLogin}>카카오톡으로 로그인하기</Button>;
};

export default LoginBtn;
