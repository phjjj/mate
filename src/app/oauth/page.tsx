"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const grantType = "authorization_code";
  let code;

  for (const [key, value] of params.entries()) {
    code = value;
  }

  const headers: AxiosRequestConfig["headers"] = {
    "Content-Type": "application/json",
  };

  const isSign = async (kakaoId: any) => {
    const res = await axios.get(`/api/users/${kakaoId}`);
    if (res.data.user) {
      return { state: true, userInfo: res.data.user };
    } else return { state: false };
  };

  const createUser = async (user: any) => {
    try {
      const res = await axios.post("/api/users", JSON.stringify(user), {
        headers,
      });

      router.push(`/chatlist?id=${res.data.user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const kakaoURL = `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&code=${code}`;
  useEffect(() => {
    axios
      .post(
        kakaoURL,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const { access_token } = res.data;
        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then(async (res) => {
            const user = {
              kakaoId: res.data.id,
              name: res.data.properties.nickname,
              email: res.data["kakao_account"].email,
              profileImage: res.data.properties["profile_image"],
            };
            const { state, userInfo }: any = await isSign(user.kakaoId);
            if (!state) {
              createUser(user);
            } else {
              router.push(`/chatlist?id=${userInfo._id}`);
            }
          });
      });
  }, []);
  return <></>;
}
