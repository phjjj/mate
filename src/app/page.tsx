"use client";

import { Main, Title, Button } from "@/app/page.style";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);
  return isLoading ? (
    <Main>
      <Title>MATE</Title>
      <Button>카카오톡으로 로그인하기</Button>
    </Main>
  ) : null;
}
