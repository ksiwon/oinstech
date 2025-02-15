import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import homeBg from "../assets/homeBg.png";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { FaTree } from "react-icons/fa";

const Home: React.FC = () => {
  const { role, studentData, teacherData } = useSelector((state: RootState) => state.user);
  const userId = role === "student" ? studentData?.id : teacherData?.id;
  const navigate = useNavigate();
  const handleNavClick = (path: string) => navigate(path);

  const lines = [
    "과외 플랫폼의 새로운 패러다임",
    "성공적인 여정을 위한 최고의 커넥션",
    "과수원",
    "학생과 튜터, 꿈과 현실을 잇는 플랫폼",
    "내게 맞는 튜터와 함께, 미래로 가는 한 걸음",
  ];

  return (
    <GlobalWrapper>
      <Header />
      {role === null ? (
        // Logout 상태
        <Main>
          {lines.map((line, index) => (
            <LineContainer key={`line-${index}`} isLogo={line === "과수원"}>
              {line === "과수원" ? (
                <Logo><FaTree size="140px"/><LogoText>{line}</LogoText></Logo>
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
      ) : ( role === "student" ? (
        // Student Login 상태
        <MainLoggedIn>
          <TextButtonContainer>
            <TextContainer>
              <MainTitle>과수원</MainTitle>
              <Subtitle>내게 맞는 튜터와 함께, 미래로 가는 한 걸음</Subtitle>
            </TextContainer>
            <ButtonContainer>
              <ActionButton color="green" onClick={() => handleNavClick("/search/teacher")}>
                <Icon className="fas fa-search" />
                <ButtonText>강사 찾기</ButtonText>
              </ActionButton>
              <ActionButton color="turkey" onClick={() => handleNavClick("/search/group")}>
                <Icon className="fas fa-users" />
                <ButtonText>그룹 매칭</ButtonText>
              </ActionButton>
              <ActionButton color="blue" onClick={() => handleNavClick("/chat/"+userId+"/poiu")}>
                <Icon className="fas fa-comments" />
                <ButtonText>채팅</ButtonText>
              </ActionButton>
            </ButtonContainer>
          </TextButtonContainer>
          <ImageContainer />
        </MainLoggedIn>
      ) : (
        // Teacher Login 상태
        <MainLoggedIn>
          <TextButtonContainer>
            <TextContainer>
              <MainTitle>과수원</MainTitle>
              <Subtitle>내게 맞는 튜터와 함께, 미래로 가는 한 걸음</Subtitle>
            </TextContainer>
            <ButtonContainer>
              <ActionButton color="green" onClick={() => handleNavClick("/search/student")}>
                <Icon className="fas fa-search" />
                <ButtonText>학생 찾기</ButtonText>
              </ActionButton>
              <ActionButton color="turkey" onClick={() => handleNavClick("/mygroup")}>
                <Icon className="fas fa-users" />
                <ButtonText>그룹 매칭</ButtonText>
              </ActionButton>
              <ActionButton color="blue" onClick={() => handleNavClick("/chat/"+userId)}>
                <Icon className="fas fa-comments" />
                <ButtonText>채팅</ButtonText>
              </ActionButton>
            </ButtonContainer>
          </TextButtonContainer>
          <ImageContainer />
        </MainLoggedIn>
      ))}
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
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
`;

const MainTitle = styled.div`
  font-size: 100px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0;
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.typography.T2.fontSize};
  font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

// Login 상태의 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button<{ color: "green" | "turkey" | "blue" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  padding: 8px;
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
  font-size: 48px;
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonText = styled.span`
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  color: ${({ theme }) => theme.colors.white};
`;
