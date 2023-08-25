"use client";

import Link from "next/link";
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
} from "../../(routes)/profile/[id]/page.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface IParams {
  id: String;
}

export default function ChatInfo() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(useParams());

  console.log(session);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? null : (
    <Main>
      <Title>프로필</Title>
      <ProfileBox>
        <UserImg src={`${session?.user.image}`} />
        <UserNameSpan>{session?.user.name}</UserNameSpan>
        <UserUpdateBtn>프로필 수정</UserUpdateBtn>
        <IntroductionBox>
          <IntroBox>
            <span>소개</span>
            <IntroParagraph>{session?.user.introduction?.intro}</IntroParagraph>
          </IntroBox>
          <CarInfoBox>
            <span>자동차</span>
            <CarImg src={`${session?.user.introduction?.carImage}`} />
          </CarInfoBox>
        </IntroductionBox>
      </ProfileBox>
      <ButtonsBox>
        <Link href={"/chat-list"}>
          <HomeButton>홈으로</HomeButton>
        </Link>
      </ButtonsBox>
    </Main>
  );
}
