import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import logoImage from '../assets/Blue_Logo.png';

const HeaderContainer = styled.header`
  background: ${theme.colors.white};
  width: calc(100% - 4rem);
  padding: 1rem 2rem;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
`;

const LogoImage = styled.img`
  height: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoImage src={logoImage} alt="OINS Logo" />
    </HeaderContainer>
  );
};

export default Header;