import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStudentData } from "../redux/slices/userSlice"; // Redux 액션 가져오기

const apiUrl = process.env.REACT_APP_API_URL;

const LoginStudent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Redux 디스패치 함수
    const [id, setId] = useState<string>(""); // ID 상태
    const [password, setPassword] = useState<string>(""); // 비밀번호 상태
    const [error, setError] = useState<string>(""); // 오류 메시지 상태

    const lines = [
        "과외 플랫폼의 새로운 패러다임",
        "성공적인 여정을 위한 최고의 커넥션",
        "Co:next",
        "학생과 튜터, 꿈과 현실을 잇는 플랫폼",
        "내게 맞는 튜터와 함께, 미래로 가는 한 걸음",
      ];

    // 회원가입 버튼 클릭 핸들러
    const handleSignupClick = () => {
        navigate("/signup/student");
    };

    // 로그인 버튼 클릭 핸들러
    const handleLoginClick = async () => {
        setError(""); // 오류 메시지 초기화
        try {
            // API 호출
            const response = await axios.post(`${apiUrl}/api/students/login`, {
                id,
                password,
            });

            // Redux에 로그인 데이터 저장
            dispatch(setStudentData(response.data));

            // 로그인 성공 후 대시보드로 이동
            navigate("/");
        } catch (err: any) {
            // 오류 처리
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("로그인 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <GlobalWrapper>
            <Header />
            <Main>
            {lines.map((line, index) => (
                <LineContainer key={`line-${index}`} isLogo={line === "Co:next"}>
                {line === "Co:next" ? (
                    <Logo>
                        <Wrapper>
                            <ContentContainer>
                                {error && <ErrorText>{error}</ErrorText>} {/* 오류 메시지 표시 */}
                                <ContentTitle>Student Login</ContentTitle>
                                <Content>
                                    <ContentName>ID</ContentName>
                                    <ContentInput>
                                        <input
                                            type="text"
                                            id="student-id"
                                            name="student-id"
                                            value={id}
                                            onChange={(e) => setId(e.target.value)} // ID 입력 핸들러
                                            required
                                        />
                                    </ContentInput>
                                </Content>
                                <Content>
                                    <ContentName>PW</ContentName>
                                    <ContentInput>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 핸들러
                                            required
                                        />
                                    </ContentInput>
                                </Content>
                            </ContentContainer>
                            <ButtonContainer>
                                <Button1 onClick={handleSignupClick}>회원가입</Button1>
                                <Button2 onClick={handleLoginClick}>로그인</Button2>
                            </ButtonContainer>
                        </Wrapper>
                    </Logo>
                ) : (
                    <MovingText>
                    <TextContent>
                        <RepeatedText isWhite>{line}</RepeatedText>
                        <RepeatedText isWhite={false}>{line}</RepeatedText>
                    </TextContent>
                    <TextContent>
                        <RepeatedText isWhite>{line}</RepeatedText>
                        <RepeatedText isWhite={false}>{line}</RepeatedText>
                    </TextContent>
                    </MovingText>
                )}
                </LineContainer>
            ))}
            </Main>
            <Footer />
        </GlobalWrapper>
    );
};

export default LoginStudent;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 32px 192px;
    height: 100%;
`;

const ContentName = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    width: 32px;
    text-align: right;
    white-space: nowrap; /* 줄바꿈 방지 */
    margin-right: 16px;
    flex-shrink: 0;
`;

const ContentInput = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    margin: 0 auto 0 0;
`;

const ContentTitle = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    justify-content: center;
    padding: 16px 0;
`;

const Button1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--White, #FFF);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gray[400]};

    align-item: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.primary};
    width: 80px;
    height: 40px;
    border-radius: 8px;
    color: var(--White, #FFF);

    align-item: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;

// 텍스트 좌우로 움직이는 애니메이션
const moveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Logout 상태의 Main 컨테이너
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* 줄 간격 균등 배치 */
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

// 텍스트 줄 컨테이너
const LineContainer = styled.div<{ isLogo?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ isLogo }) =>
    isLogo &&
    `
    z-index: 10;
  `}
`;

// 움직이는 텍스트
const MovingText = styled.div`
  display: flex;
  overflow: hidden; /* 텍스트가 영역 밖으로 나가지 않도록 */
  width: 100%;
  position: relative;
`;

// 반복되는 텍스트 컨텐츠
const TextContent = styled.div`
  display: flex;
  width: 200%; /* 두 개의 텍스트가 끊김 없이 보이도록 설정 */
  white-space: nowrap;
  animation: ${moveAnimation} 20s linear infinite;
`;

// 텍스트 반복 (White와 Blue-300 교차)
const RepeatedText = styled.div<{ isWhite: boolean }>`
  font-size: 60px;
  font-weight: 700;
  color: ${({ theme, isWhite }) =>
    isWhite ? theme.colors.white : theme.colors.green[600]};
  margin-right: 40px;
`;

// 로고
const Logo = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 160px;
  font-weight: 900;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
`;