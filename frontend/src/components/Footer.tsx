import React from "react";
import {
  FooterContainer,
  FooterLogo,
  FooterNav,
  FooterNavItem,
} from "./Footer.styles";
import { FaTree } from "react-icons/fa";

const Footer = () => {

  const handleAcademy = () => {
    window.open("https://blog.naver.com/kaipos201", "_blank");
  };

  const handleGithub = () => {
    window.open("https://github.com/ksiwon/conext", "_blank");
  };

  const handleDeveloper = () => {
    alert("KAIST 전산학부 22학번 박정원");
  }

  return (
    <FooterContainer>
      <FaTree size="20px" color="23C064"/>
      <FooterLogo onClick={handleAcademy}>과수원</FooterLogo>
      <FooterNav>
        <FooterNavItem onClick={handleDeveloper}>만든 사람들</FooterNavItem>
        <FooterNavItem onClick={handleGithub}>이용약관</FooterNavItem>
        <FooterNavItem onClick={handleGithub}>개인정보처리방침</FooterNavItem>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;