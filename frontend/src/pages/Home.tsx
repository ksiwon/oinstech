import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 이미지 import
import ceoImage from '../assets/ceo.png'; // 오상근
import ctoImage from '../assets/cto.png'; // 이도윤
import cooImage from '../assets/coo.png'; // 윤성수
import ccoImage from '../assets/cco.png'; // 박정원
import cioImage from '../assets/cio.png'; // 박대훈

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, ${theme.colors.blue[100]} 0%, ${theme.colors.gray[100]} 100%);
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    gap: 2rem;
    padding: 2rem 1rem;
  }
`;

const MissionSection = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MissionStatement = styled.p`
  font-family: ${theme.typography.T1.fontFamily};
  font-weight: ${theme.typography.T1.fontWeight};
  font-size: ${theme.typography.T1.fontSize};
  color: ${theme.colors.primary};
  line-height: 1.6;
  max-width: 800px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${theme.typography.T4.fontSize};
    line-height: 1.5;
  }
`;

const AccessButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.blue[600]} 0%, ${theme.colors.turkey[600]} 100%);
  color: ${theme.colors.white};
  border: none;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  font-family: ${theme.typography.T2.fontFamily};
  font-weight: ${theme.typography.T2.fontWeight};
  font-size: ${theme.typography.T2.fontSize};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(22, 104, 202, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(22, 104, 202, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    font-size: ${theme.typography.T3.fontSize};
  }
`;

const TopSection = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  justify-content: center;
  align-items: center;
`;

const BottomSection = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MemberCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 15px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 280px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }
`;

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MemberPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.gray[200]};
  transition: border-color 0.3s ease;

  ${MemberCard}:hover & {
    border-color: ${theme.colors.blue[600]};
  }
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MemberRole = styled.div`
  font-family: ${theme.typography.T4.fontFamily};
  font-weight: ${theme.typography.T4.fontWeight};
  font-size: ${theme.typography.T4.fontSize};
  color: ${theme.colors.blue[600]};
  margin-bottom: 0.25rem;
`;

const MemberClass = styled.div`
  font-family: ${theme.typography.T6.fontFamily};
  font-weight: ${theme.typography.T6.fontWeight};
  font-size: ${theme.typography.T6.fontSize};
  color: ${theme.colors.gray[400]};
`;

const MemberDetails = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MemberDetail = styled.li`
  text-align: left;
  font-family: ${theme.typography.T6.fontFamily};
  font-weight: ${theme.typography.T6.fontWeight};
  font-size: ${theme.typography.T6.fontSize};
  color: ${theme.colors.black};
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "•";
    color: ${theme.colors.blue[600]};
    position: absolute;
    left: 0;
  }
`;

// Modal Styles
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
`;

const ModalTitle = styled.h2`
  font-family: ${theme.typography.T2.fontFamily};
  font-weight: ${theme.typography.T2.fontWeight};
  font-size: ${theme.typography.T2.fontSize};
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${theme.colors.gray[200]};
  border-radius: 10px;
  font-family: ${theme.typography.T5.fontFamily};
  font-weight: ${theme.typography.T5.fontWeight};
  font-size: ${theme.typography.T5.fontSize};
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue[600]};
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModalButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-family: ${theme.typography.T5.fontFamily};
  font-weight: ${theme.typography.T5.fontWeight};
  font-size: ${theme.typography.T5.fontSize};
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$variant === 'primary' ? `
    background: ${theme.colors.blue[600]};
    color: ${theme.colors.white};
    
    &:hover {
      background: ${theme.colors.blue[300]};
    }
  ` : `
    background: ${theme.colors.gray[200]};
    color: ${theme.colors.black};
    
    &:hover {
      background: ${theme.colors.gray[400]};
    }
  `}
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.red[600]};
  font-family: ${theme.typography.T7.fontFamily};
  font-weight: ${theme.typography.T7.fontWeight};
  font-size: ${theme.typography.T7.fontSize};
  text-align: center;
  margin-bottom: 1rem;
`;

// Types
interface TeamMember {
  role: string;
  name: string;
  class: string;
  details: string[];
  image: string;
}

// Team data
const teamMembers: TeamMember[] = [
  {
    role: "CEO",
    name: "오상근",
    class: "KAIST CS '22",
    image: ceoImage,
    details: [
      "KAIST 전산학부 부학생회장",
      "KAIST 학부 동아리연합회 회장",
      "Karost 사이트 개발 PM",
      "대전 노벨과학동아리 발표대회 대상",
      "KAIST 전체학생대표자회의 대의원",
      "KAIST 중앙운영위원",
      "KAIST 사회분과 학생회장",
      "학원 강사 및 조교 경력 (3년 이상)",
      "과학 학원 대표 강사 (1년)"
    ]
  },
  {
    role: "CTO",
    name: "이도윤",
    class: "KAIST TS '22",
    image: ctoImage,
    details: [
      "KAIST 융합인재학부 학생회장",
      "KAIST Ctrl Lab 개발연구",
      "교육 스타트업 회사 인턴 경험 有",
      "캄보디아 영어회화 교육로봇 하드웨어 개발팀장",
      "KAIST 글로벌리더십 봉사부문 수상",
      "학원 강사 경력 (1년)"
    ]
  },
  {
    role: "COO",
    name: "윤성수",
    class: "KAIST CS '23",
    image: cooImage,
    details: [
      "KAIST 전산학부 집행위원",
      "Karost 사이트 개발 백엔드 APM",
      "세종과학영재학교 자율연구발표대회 금상",
      "과학영재학교 우수 R&E 공동발표회 우수상"
    ]
  },
    {
    role: "CCO",
    name: "박정원",
    class: "KAIST CS / ID '22",
    image: ccoImage,
    details: [
      "KAIST 전산학부 학생회장",
      "KAIST SPARCS 디자이너",
      "KAIST AI Experience Lab 인턴",
      "삼성휴먼테크논문대상 물리/지구과학 부문 은상",
      "Kakao 테크포임팩트 캠퍼스 공감인기상",
      "전국과학전람회 물리 부문 우수상",
      "전국과학전람회 지구 및 환경 부문 장려상",
      "부산미래과학자상 과학 부문 최우수상",
      "한국산업융합학회 추계 학술대회 우수 발표 논문",
      "창의과제연구(R&E) 최종 발표대회 동상",
      "학원 강사 경력 (3년) & 총괄 팀장 역임"
    ]
  },
  {
    role: "CIO",
    name: "박대훈",
    class: "KAIST CS '24",
    image: cioImage,
    details: [
      "KAIST 전산학부 집행위원",
      "2023 제32기 정보올림피아드 겨울학교 수료",
      "전국학생통계활용대회 은상",
      "전국과학전람회 SW/IT 부문 장려상",
      "전국 고등학교 동아리 소프트웨어 경진대회 장려상",
      "2023 AI Youth Challenge 우수상"
    ]
  }
];

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAccessClick = (): void => {
    setIsModalOpen(true);
    setPassword('');
    setError('');
  };

  const handlePasswordSubmit = (): void => {
    if (password === 'oins314') { // 예시 비밀번호
      window.open('https://dab4u.oinstech.com', '_blank');
      setIsModalOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  return (
    <PageContainer>
      <Header />
      
      <MainContent>
        <MissionSection>
          <MissionStatement>
            ONIS는 AI 기술을 바탕으로 교육의 비효율을 혁신하여, 교육의 새로운 패러다임을 만들어 갑니다.
          </MissionStatement>
        </MissionSection>

        <TopSection>
          <AccessButton onClick={handleAccessClick}>
            AI 채점 시스템 접속
          </AccessButton>
        </TopSection>

        <BottomSection>
          {teamMembers.map((member: TeamMember, index: number) => (
            <MemberCard key={index}>
              <MemberHeader>
                <MemberPhoto
                  src={member.image}
                  alt={`${member.name} 프로필`}
                />
                <MemberInfo>
                  <MemberRole>{member.role} {member.name}</MemberRole>
                  <MemberClass>{member.class}</MemberClass>
                </MemberInfo>
              </MemberHeader>
              <MemberDetails>
                {member.details.map((detail: string, detailIndex: number) => (
                  <MemberDetail key={detailIndex}>{detail}</MemberDetail>
                ))}
              </MemberDetails>
            </MemberCard>
          ))}
        </BottomSection>
      </MainContent>

      <Footer />

      <ModalOverlay $isOpen={isModalOpen} onClick={handleModalClose}>
        <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <ModalTitle>비밀번호를 입력하세요</ModalTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <PasswordInput
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="비밀번호 입력"
            autoFocus
          />
          <ModalButtons>
            <ModalButton $variant="secondary" onClick={handleModalClose}>
              취소
            </ModalButton>
            <ModalButton $variant="primary" onClick={handlePasswordSubmit}>
              확인
            </ModalButton>
          </ModalButtons>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default Home;