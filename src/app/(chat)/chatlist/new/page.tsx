"use client";
import { CgProfile } from "react-icons/cg";
import { BsArrowRightCircle } from "react-icons/bs";
import { ButtonContainer, ChatTitleInput, Form, Header, CreateButton, InputContainer } from "./page.style";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";

export default function New() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [departures, setDepartures] = useState<string | undefined>("");
  const [destination, setDestination] = useState<string | undefined>("");
  const [departuresTime, setDeparturesTime] = useState<string | undefined>("");
  const [destinationTime, setDestinationTime] = useState<string | undefined>("");
  const [people, setPeople] = useState<number | undefined>(0);
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
          departuresTime,
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

  const chatNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // 원래 쓰던 input 혹시나 해서 주석 처리

  // const endPointInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDestination(event.target.value);
  // };
  // const departureTimeInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDepartureTime(event.target.value);
  // };
  // const arrivalTimeInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDestinationTime(event.target.value);
  // };
  // const numberOfPeopleInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPeople(+event.target.value);
  // };

  // 출발지 옵션
  const departuresOptions = [
    { value: "인동", label: "인동" },
    { value: "옥계", label: "옥계" },
  ];

  // 목적지 옵션
  const destinationOptions = [{ value: "경운대학교", label: "경운대학교" }];

  // 출발시간 옵션
  const departuresTimeOptions = [
    { value: "08:40", label: "08:40" },
    { value: "08:50", label: "08:50" },
  ];

  // 도착시간 옵션
  const destinationTimeOptions = [
    { value: "09:10", label: "09:10" },
    { value: "09:20", label: "09:20" },
  ];

  // 사람 수 옵션
  const poepleOptions = [
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

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
              <Select
                placeholder={"출발지"}
                onChange={(option) => setDepartures(option?.value)}
                isSearchable={false}
                options={departuresOptions}></Select>
              <BsArrowRightCircle size={23} />
              <Select
                placeholder={"도착지"}
                onChange={(option) => setDestination(option?.value)}
                isSearchable={false}
                options={destinationOptions}></Select>
            </InputContainer>
            <label>출발시간과 도착시간을 설정해주세요.</label>
            <InputContainer>
              <Select
                placeholder={"출발시간"}
                onChange={(option) => setDeparturesTime(option?.value)}
                isSearchable={false}
                options={departuresTimeOptions}></Select>
              <BsArrowRightCircle size={23} />
              <Select
                placeholder={"도착시간"}
                onChange={(option) => setDestinationTime(option?.value)}
                isSearchable={false}
                options={destinationTimeOptions}></Select>
            </InputContainer>
            <label>인원수를 설정해주세요.</label>
            <div>
              <Select
                placeholder={"인원수"}
                onChange={(option) => setPeople(option?.value)}
                isSearchable={false}
                options={poepleOptions}></Select>
            </div>
            <ButtonContainer>
              <button>취소</button>
              <CreateButton
                disabled={
                  title === "" ||
                  departures === "" ||
                  destination === "" ||
                  departuresTime === "" ||
                  destinationTime === "" ||
                  people === 0
                    ? true
                    : false
                }>
                생성하기
              </CreateButton>
            </ButtonContainer>
          </Form>
        </>
      ) : null}
    </>
  );
}
