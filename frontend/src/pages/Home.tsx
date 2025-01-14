import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import homeBg from "../assets/homeBg.png";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Home: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.role);

  const buttonText = role === "student" ? "강사 찾기" : "학생 찾기";

  const lines = [
    "과외 플랫폼의 새로운 패러다임",
    "성공적인 여정을 위한 최고의 커넥션",
    "Co:next",
    "학생과 튜터, 꿈과 현실을 잇는 플랫폼",
    "내게 맞는 튜터와 함께, 미래로 가는 한 걸음",
  ];

  return (
    <Wrapper>
      <Header />
      {role === null ? (
        // Logout 상태
        <Main>
          {lines.map((line, index) => (
            <LineContainer key={`line-${index}`} isLogo={line === "Co:next"}>
              {line === "Co:next" ? (
                <Logo>{line}</Logo>
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
      ) : (
        // Login 상태
        <MainLoggedIn>
          <TextButtonContainer>
            <TextContainer>
              <MainTitle>Co:next</MainTitle>
              <Subtitle>내게 맞는 튜터와 함께, 미래로 가는 한 걸음</Subtitle>
            </TextContainer>
            <ButtonContainer>
              <ActionButton color="green">
                <Icon className="fas fa-search" />
                <ButtonText>{buttonText}</ButtonText>
              </ActionButton>
              <ActionButton color="turkey">
                <Icon className="fas fa-users" />
                <ButtonText>그룹 매칭</ButtonText>
              </ActionButton>
              <ActionButton color="blue">
                <Icon className="fas fa-comments" />
                <ButtonText>채팅</ButtonText>
              </ActionButton>
            </ButtonContainer>
          </TextButtonContainer>
          <ImageContainer />
        </MainLoggedIn>
      )}
      <Footer />
    </Wrapper>
  );
};

export default Home;

// ------------------ Styled Components ------------------

// 텍스트 좌우로 움직이는 애니메이션
const moveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// 전체 Wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
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
  font-size: 80px;
  font-weight: 600;
  color: ${({ theme, isWhite }) =>
    isWhite ? theme.colors.white : theme.colors.blue[300]};
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

// Login 상태의 Main 컨테이너
const MainLoggedIn = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-size: cover;
`;

// 텍스트 버튼 컨테이너
const TextButtonContainer = styled.div`
  display: flex;
  gap: 80px;
  flex-direction: column;
  align-items: center;
  padding: 0 48px;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background: url(${homeBg}) no-repeat center center;
  background-size: cover;
`;

// Login 상태의 텍스트 컨테이너
const TextContainer = styled.div`
  text-align: center;
`;

const MainTitle = styled.h1`
  font-size: 160px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

// Login 상태의 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const ActionButton = styled.button<{ color: "green" | "turkey" | "blue" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 176px;
  height: 176px;
  padding: 24px;
  border-radius: 16px;
  background-color: ${({ theme, color }) => theme.colors[color][600]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  gap: 16px;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const Icon = styled.i`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;
