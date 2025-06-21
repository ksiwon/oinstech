import React, { useState } from "react";
import styled from "styled-components";
import ConfirmationModal from "./ConfirmationModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: ""
  });

  const handleInfo = (type: string) => {
    if (type === "terms") {
      setModalContent({
        title: "안내",
        message: "이용약관이 미구현되었습니다."
      });
    } else if (type === "privacy") {
      setModalContent({
        title: "안내",
        message: "개인정보처리방침이 미구현되었습니다."
      });
    }
    setIsModalOpen(true);
  };

  return (
    <FooterContainer>
      <FooterLogo></FooterLogo>
      <NavWrapper>
        <FooterNav>
          <FooterNavItem>상호명 : OINS</FooterNavItem>
          <FooterNavDivider>|</FooterNavDivider>
          <FooterNavItem>대표 : 오상근</FooterNavItem>
          <FooterNavDivider>|</FooterNavDivider>
          <FooterNavItem>사업자등록번호 : 미등록</FooterNavItem>
        </FooterNav>
        <FooterNav>
          <FooterNavItem>본사 : 대전광역시 유성구 대학로 291</FooterNavItem>
        </FooterNav>
        <FooterNav>
          <FooterNavItem>Tel. 010-5693-6727</FooterNavItem>
          <FooterNavDivider>|</FooterNavDivider>
          <FooterNavItem>Email. oinsnio24@gmail.com</FooterNavItem>
        </FooterNav>
      </NavWrapper>
      <FooterRight>
        <FooterRightItem onClick={() => handleInfo("terms")}>이용약관</FooterRightItem>
        <FooterRightItem onClick={() => handleInfo("privacy")}>개인정보처리방침</FooterRightItem>
      </FooterRight>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        confirmText="확인"
        showCancelButton={false}
      />
    </FooterContainer>
  );
};

export default Footer;

// Footer 컨테이너
const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  background-color: ${(props) => props.theme.colors.white};
  border-top: 2px solid ${(props) => props.theme.colors.gray[400]};
  padding: 8px 16px;
  box-sizing: border-box;
  margin-top: auto;
`;

// 로고 스타일
const FooterLogo = styled.div`
  background-image: url('/assets/Blue_Logo.png');
  width: 90px;
  height: 36px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

// Footer 네비게이션
const FooterNav = styled.nav`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding: 0px 24px;
  align-items: center;
  gap: 8px;
`;

const FooterNavDivider = styled.div`
  font-size: ${(props) => props.theme.typography.T6.fontSize};
  font-weight: ${(props) => props.theme.typography.T6.fontWeight};
  color: ${(props) => props.theme.colors.gray[400]};
`;

// Footer 네비게이션 아이템
const FooterNavItem = styled.div`
  font-size: ${(props) => props.theme.typography.T7.fontSize};
  font-weight: ${(props) => props.theme.typography.T7.fontWeight};
  color: ${(props) => props.theme.colors.gray[400]};
  &:hover {
    color: ${(props) => props.theme.colors.black}; /* Hover 시 색상 변경 */
  }
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: auto;
  margin-bottom: auto;
  gap: 16px;
`;

const FooterRightItem = styled.div`
  font-size: ${(props) => props.theme.typography.T6.fontSize};
  font-weight: ${(props) => props.theme.typography.T6.fontWeight};
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;