import { LoginBox, Main, Title } from "@/src/app/page.style";
import LoginBtn from "@/src/app/_components/Button/LoginBtn";

export const metadata = {
  title: "mate",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
export default function Home() {
  return (
    <Main>
      <Title>MATE</Title>
      <LoginBox>
        <LoginBtn />
      </LoginBox>
    </Main>
  );
}
