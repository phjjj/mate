"use client";

import Link from "next/link";
import imageCompression from "browser-image-compression";

import {
  HomeButton,
  RedButton,
  ButtonsBox,
  Main,
  ProfileBox,
  Title,
  UserImg,
  UserNameSpan,
  IntroductionBox,
  IntroBox,
  IntroParagraph,
  CarImg,
  CarInfoBox,
  UserUpdateBtn,
  CarImgInput,
} from "./page.style";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { redirect, useParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface IParams {
  id: String;
}

export default function Profile() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 이미지 미리보기
  const [carImage, setCarImage]: any = useState(null);
  // 소개글
  const [intro, setIntro]: any = useState();
  const [user, setUser] = useState<any>({});
  const { id } = useParams() as { id: string };
  const carImageInput = useRef() as any;
  const router = useRouter();

  const axiosGetReqUser = async () => {
    const {
      data: { user },
    } = await axios.get(`/api/users/profile/${id}`);
    setUser(user);
    setIntro(user.introduction.intro);
    setCarImage(user.introduction.carImage);
  };

  useEffect(() => {
    axiosGetReqUser();
    setIsLoading(false);
    // 이미지 가져오기
    // setCarImage(user.introduction.carImage as any);
  }, []);

  // 업데이트
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/api/users/profile/${id}`, { data: { carImage, intro } });
    router.push(`/profile/${id}`);
  };

  const onUpload = async (e: any) => {
    // 파일 선택 안 할 경우 에러 떠서 추가
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileSize = file.size;
    const maxSize = 3 * 1024 * 1024;

    if (fileSize > maxSize) {
      alert("사진은 3MB 이내로 업로드가 가능합니다.");
      e.target.value = "";
      return;
    }
    // 이미지 용량 압축
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 3, // 최대 파일 크기
        useWebWorker: true, // 웹 워커 사용 여부
        initialQuality: 0.5, // 이미지 퀄리티 줄이기
      });

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);

      reader.onload = () => {
        setCarImage(reader.result || null); // 파일의 컨텐츠
      };
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  // 이미지 클릭시 input 클릭
  const onClickCarImg = () => {
    carImageInput.current.click();
  };

  return (
    <Main>
      <Title>프로필</Title>
      <form onSubmit={handleSubmit}>
        <ProfileBox>
          <UserImg src={`${session?.user.image}`} />
          <UserNameSpan>{session?.user.name}</UserNameSpan>
          <IntroductionBox>
            <IntroBox>
              <span>소개</span>
              <IntroParagraph
                onChange={(e) => {
                  setIntro(e.target.value);
                }}
                defaultValue={intro}
                type="text"
              />
            </IntroBox>
            <CarInfoBox>
              <span>자동차</span>
              {/* input 숨기기 */}
              <CarImgInput ref={carImageInput} accept="image/*" type="file" onChange={onUpload} />
              <CarImg onClick={onClickCarImg} src={carImage} />
            </CarInfoBox>
          </IntroductionBox>
        </ProfileBox>
        <ButtonsBox>
          <HomeButton>수정 완료</HomeButton>
        </ButtonsBox>
      </form>
    </Main>
  );
}
