import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

import connectToDB from "/src/app/_libs/mongodb";
import User from "/src/app/_models/user";

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const sessionUser = await User.findOne({
          name: session.user.name,
        });

        // 커스텀 세션 user id
        session.user.id = sessionUser._id;
        session.user.kakaoId = sessionUser.kakaoId;
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // 같은 닉네임 존재하는지 검사

        const userExists = await User.findOne({
          name: profile.properties.nickname,
        });

        if (!userExists) {
          await User.create({
            kakaoId: profile.id,
            eamil: profile["kakao_account"].email,
            name: profile.properties.nickname,
            profileImage: profile.properties["profile_image"],
            introduction: { intro: "", carImage: "" },
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        주;
        return false;
      }
    },
    async signOut() {
      try {
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
