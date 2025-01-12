import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
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
  overflow: hidden;
`;

// Main 컨테이너
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
