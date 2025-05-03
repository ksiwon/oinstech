import React from "react";
import {
  FooterContainer,
  FooterLogo,
  FooterNav,
  FooterNavItem,
} from "./Footer.styles";

const Footer = () => {

  const handleDeveloper = () => {
    alert("KAIST 전산학부 22학번 박정원");
  }

  return (
    <FooterContainer>
      <FooterLogo>OINS</FooterLogo>
      <FooterNav>
        <FooterNavItem onClick={handleDeveloper}>만든 사람들</FooterNavItem>
        <FooterNavItem>이용약관</FooterNavItem>
        <FooterNavItem>개인정보처리방침</FooterNavItem>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;