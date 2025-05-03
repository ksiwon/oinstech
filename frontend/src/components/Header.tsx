import React from "react";
import {
  HeaderContainer,
  LogoAndNav,
  Logo,
  LogoText
} from "./Header.styles";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  // 네비게이션 핸들러
  const handleNavClick = (path: string) => navigate(path);
  return (
    <HeaderContainer>
      {/* 로고 및 네비게이션 */}
      <LogoAndNav>
        <Logo onClick={() => handleNavClick("/")}>
          <LogoText>OINS</LogoText>
        </Logo>
      </LogoAndNav>
    </HeaderContainer>
  );
};

export default Header;
