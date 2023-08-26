import { styled } from "styled-components";

export const ChatInfoBox = styled.div`
  position: relative;
  padding: 10px;
  display: flex;
  width: 337px;
  height: 95px;
  background-color: white;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ChatInfoHeader = styled.div`
  display: flex;
  align-items: center;
  & .mark {
    margin-left: 20px;
    color: orange;
  }
`;

export const ChatInfoHeaderTitle = styled.span`
  color: orange;
  display: flex;
  margin-left: 40px;
  font-size: 0.8rem;
`;

export const ChatInfoTime = styled.span`
  display: flex;
  margin-left: 20px;
  color: gray;
  font-size: 0.5rem;
  align-items: center;
  & .clock__icon {
    margin-right: 0.2rem;
  }
`;

export const ChatInfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  width: 90%;
  margin-left: 20px;
  gap: 30px;
  & svg {
    width: 60px;
  }
`;

export const ChatInfoAreaDepartureText = styled.span`
  width: 100px;
`;

export const ChatInfoAreaDestinationText = styled.span`
  width: 100px;
`;

export const ChatInfoPeople = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 0.8rem;
`;

export const ChatInfoPeopleText = styled.span`
  color: gray;
  font-size: 0.5rem;
`;
