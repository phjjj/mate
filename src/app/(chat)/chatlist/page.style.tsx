"use client";

import { styled } from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  gap: 40px;
`;
export const TitleBox = styled.div`
  display: flex;
  margin-top: 50px;
  color: #000;
  text-align: center;
  font-family: Archivo Black;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.667px;
  text-transform: uppercase;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    margin: 0 auto;
    margin-top: 50px;

    .button {
      color: white;
      font-size: 50px;
    }
  }
`;
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  height: 600px;
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
