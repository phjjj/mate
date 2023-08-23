import { styled } from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    display: flex;
    margin: 0 auto;
    margin-top: 50px;

    .button {
      color: #74b9ff;
      font-size: 50px;
    }
  }
`;
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
`;
export const Item = styled.li`
  position: relative;
  padding: 10px;
  display: flex;
  width: 337px;
  height: 128px;
  background-color: white;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .mark {
    color: #315eff;
    position: absolute;
    font-size: 25px;
    left: 0;
    top: 0;
    margin-left: 20px;
  }
`;

export const ItemTitleBox = styled.div`
  font-size: 23px;
`;

export const ChatInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  svg {
    display: flex;
    width: 33%;
  }
`;
export const DeparturesInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DeparturesText = styled.span`
  color: #b9696d;
  text-align: center;
  font-family: Nunito Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 50px;
`;
export const DeparturesTimeSpan = styled.span`
  color: #000;
  text-align: center;
  font-family: Nunito Sans;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const DestinationInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DestinationText = styled.span`
  display: flex;
  color: #b9696d;
  text-align: center;
  font-family: Nunito Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 50px;
`;
export const DestinationTimeSpan = styled.span`
  color: #000;
  text-align: center;
  font-family: Nunito Sans;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ChatInfoBox2 = styled.div`
  display: flex;
  gap: 65px;
  align-items: center;
`;
export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const UserImg = styled.img`
  background-color: grey;
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
export const UserNameText = styled.span`
  display: flex;
  width: 40px;
  color: #37374a;
  font-family: Nunito Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  // 줄바꿈 사라지게하기
  white-space: nowrap;
`;
export const UsersNumberSpan = styled.span`
  display: flex;
  width: 40px;
  color: #000;
  text-align: center;
  font-family: Nunito Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
