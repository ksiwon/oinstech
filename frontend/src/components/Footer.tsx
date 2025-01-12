import React from "react";
import {
  FooterContainer,
  FooterLogo,
  FooterNav,
  FooterNavItem,
} from "./Footer.styles";

const Footer = () => {

  const handleGithub = () => {
    window.open("https://github.com/ksiwon/conext", "_blank");
  };

  const handleDeveloper = () => {
    alert("KAIST 전산학부 박정원\nSKKU 소프트웨어학과 장효진");
  }

  return (
    <FooterContainer>
      <FooterLogo>Co:next</FooterLogo>
      <FooterNav>
        <FooterNavItem onClick={handleDeveloper}>만든 사람들</FooterNavItem>
        <FooterNavItem onClick={handleGithub}>박정원</FooterNavItem>
        <FooterNavItem onClick={handleGithub}>장효진</FooterNavItem>
      </FooterNav>
    </FooterContainer>
  );
};

export default Footer;