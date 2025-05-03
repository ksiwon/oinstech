import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const lines = [
    "문제 업로드 / AI 문제 제작",
    "해설지 맞춤형 답안지 자동 제작",
    "OINS",
    "자체 제작 OCR 기반 빠른 채점",
    "AI 기반 통계 + 피드백 관리",
  ];

  return (
    <GlobalWrapper>
      <Header />
        <Main>
          {lines.map((line, index) => (
            <LineContainer key={`line-${index}`} isLogo={line === "과수원"}>
              {line === "OINS" ? (
                <Logo><LogoText>{line}</LogoText></Logo>
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
const GlobalWrapper = styled.div`
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
  font-size: 60px;
  font-weight: 700;
  color: ${({ theme, isWhite }) =>
    isWhite ? theme.colors.white : theme.colors.green[600]};
  margin-right: 20px;
`;

// 로고
const Logo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const LogoText = styled.div`
  font-family: Pretendard, sans-serif;
  font-size: 160px;
  font-weight: 900;
`;