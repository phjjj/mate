<div align="center">
  <h1>MATE</h1>
  <p >
    지방대학 버스 교통 접근성 문제로 인해 등교하기 힘든 학생을 위한 카풀 플랫폼!<br/>
    MATE 카풀 플랫폼을 통해 간편하게 자동차를 공유하여 등교 여유를 제공합니다!
  </p>
</div>

## 프로젝트 소개
<p>MATE 플랫폼은 지방 대학교 학생들이 대학 등교에 어려움을 겪는 시내버스의 긴 시간을 극복하기 위해 자동차를 공유하고 교내에서 카풀 운영할 수 있도록 지원하는 서비스입니다. 이로써 대중교통의 높은 접근성을 유지하면서 학생들에게 편리한 대안을 제공합니다.</p>


## 개발 기간
- 23.08.07일 ~ 23.09

## 맴버 구성
- 박해준(프론트엔드)
- 손민석(프론트엔드)

## 개발 환경
<div align="center">
  <h3>프론트엔드</h3>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <h3>백엔드</h3>
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
</div>

## UI/UX
 |초기화면|홈|채팅방생성|채팅방|프로필|
  |---|---|---|---|---|
  |<img width="395" alt="스크린샷 2023-09-12 오후 2 43 37" src="https://github.com/phjjj/mate/assets/44064257/b58db10f-628d-4bbb-acb1-566ea077e4b3">|<img width="387" alt="스크린샷 2023-09-12 오후 2 35 12" src="https://github.com/phjjj/mate/assets/44064257/c337f5b4-675e-4b22-93eb-6bcd1e44c379">|<img width="405" alt="스크린샷 2023-09-12 오후 2 34 59" src="https://github.com/phjjj/mate/assets/44064257/ad63a105-8ee0-4999-91a6-0633ad670d5b">|<img width="378" alt="스크린샷 2023-09-12 오후 2 35 56" src="https://github.com/phjjj/mate/assets/44064257/e5019d2f-6adf-4fb0-bf13-56575e635abb">|<img width="381" alt="스크린샷 2023-09-12 오후 2 36 18" src="https://github.com/phjjj/mate/assets/44064257/101e89d6-90c5-4ad3-9654-02a927f05c35">|
  |카카오 회워가입 및 로그인|채팅방 목록|채팅방 생성폼 작성|해당 카풀 채팅방|프로필 정보|

## 페이지별 기능
### [초기화면]
  |초기화면|
  |---|
  |<img width="395" alt="스크린샷 2023-09-12 오후 2 43 37" src="https://github.com/phjjj/mate/assets/44064257/b58db10f-628d-4bbb-acb1-566ea077e4b3">|
  - SNS 로그인 API 중 카카오 간편로그인 API를 이용하여 로그인 요청 수행합니다.
  - 카카오 로그인과정에서 받아온 유저 데이터를 세션에 저장합니다.
### [홈]
  |홈|
  |---|
  |<img width="387" alt="스크린샷 2023-09-12 오후 2 35 12" src="https://github.com/phjjj/mate/assets/44064257/c337f5b4-675e-4b22-93eb-6bcd1e44c379">|
  - DB로부터 채팅목록 받아온 채팅 데이터를 최근 업로드된 순으로 보여줍니다.
  - 해당 채팅방 참여유무 기능 구현했습니다.
    - 해당된 채팅방 참여한 방이면 채팅방 참여 해줍니다.
    - 만약 채팅방 참여 안했으면 채팅방 인원 체크 한뒤 채팅방 참여 해줍니다.
  - 채팅방 호스트 유무.
    - 채팅방 호스트가 없을 경우 채팅은 참여 중인 멤버 간에만 가능하도록 제한되었습니다.
    - 해당 채팅방에 멤버가 없으면 자동으로 채팅방이 삭제되도록 구현되었습니다.

  
## 핵심 기능
1. 소셜로그인 API 활용.
2. 로그인 유지.
3. 채팅 기능.
4. 라우팅 보호.
5. 컴포넌트 분리






