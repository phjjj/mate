"use client";
import { CgProfile } from "react-icons/cg";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  ButtonContainer,
  ChatTitleInput,
  Form,
  Header,
  Input,
  InputContainer,
} from "./page.style";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function New() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [departures, setDepartures] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [destinationTime, setDestinationTime] = useState<string>("");
  const [people, setPeople] = useState<number>(1);
  const [host, setHost] = useState<string>("");

  const params = useSearchParams();
  let id = "";

  for (const [key, value] of params.entries()) {
    id = value;
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const headers: AxiosRequestConfig["headers"] = {
    "Content-Type": "application/json",
  };

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `/api/chats`,
        JSON.stringify({
          title,
          departures,
          destination,
          departureTime,
          destinationTime,
          people,
          id,
        }),
        { headers }
      );
      if (res.status === 201) {
        router.push(`/chatlist?id=${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chatNameInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };
  const startPointInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartures(event.target.value);
  };
  const endPointInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestination(event.target.value);
  };
  const departureTimeInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartureTime(event.target.value);
  };
  const arrivalTimeInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationTime(event.target.value);
  };
  const numberOfPeopleInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPeople(+event.target.value);
  };
  return (
    <>
      {!isLoading ? (
        <>
          <Header>
            <div className="title__container">
              <span className="profile__svg">
                <CgProfile size={29} color="0084FF" />
              </span>
              <h2>채팅방 만들기</h2>
            </div>
          </Header>
          <Form onSubmit={handleSubmit}>
            <ChatTitleInput
              onChange={chatNameInputChangeHandler}
              value={title}
              placeholder=" 채팅방 이름을 입력해주세요."
            />
            <label>출발지와 도착지를 설정해주세요.</label>
            <InputContainer>
              <Input
                onChange={startPointInputChangeHandler}
                value={departures}
                placeholder="출발지"
              />
              <BsArrowRightCircle size={23} />
              <Input
                onChange={endPointInputChangeHandler}
                value={destination}
                placeholder="도착지"
              />
            </InputContainer>
            <label>출발시간과 도착시간을 설정해주세요.</label>
            <InputContainer>
              <Input
                onChange={departureTimeInputChangeHandler}
                value={departureTime}
                placeholder="출발시간"
              />
              <BsArrowRightCircle size={23} />
              <Input
                onChange={arrivalTimeInputChangeHandler}
                value={destinationTime}
                placeholder="도착시간"
              />
            </InputContainer>
            <label>인원수를 설정해주세요.</label>
            <div>
              <Input
                onChange={numberOfPeopleInputChangeHandler}
                value={people}
                placeholder="인원"
                type="number"
              />
            </div>
            <ButtonContainer>
              <button>취소</button>
              <button>생성하기</button>
            </ButtonContainer>
          </Form>
        </>
      ) : null}
    </>
  );
}
