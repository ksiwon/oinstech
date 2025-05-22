import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background: ${theme.colors.white};
  width: calc(100% - 2rem);
  padding: 1rem;
  text-align: center;
  border-top: 1px solid ${theme.colors.gray[200]};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CompanyName = styled.div`
  font-family: ${theme.typography.T3.fontFamily};
  font-weight: ${theme.typography.T3.fontWeight};
  font-size: ${theme.typography.T3.fontSize};
  color: ${theme.colors.black};
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
  font-family: ${theme.typography.T7.fontFamily};
  font-weight: ${theme.typography.T7.fontWeight};
  font-size: ${theme.typography.T7.fontSize};
  color: ${theme.colors.gray[400]};
  line-height: 1.8;
`;

const ContactInfo = styled.div`
  font-family: ${theme.typography.T7.fontFamily};
  font-weight: ${theme.typography.T7.fontWeight};
  font-size: ${theme.typography.T7.fontSize};
  color: ${theme.colors.gray[400]};
  
  a {
    color: ${theme.colors.blue[600]};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanyName>상호명 : 오인스 | 대표이사 : 오상근</CompanyName>
        <CompanyInfo>
          본사 : 대전광역시 유성구 대학로 291 KAIST W8 314호
        </CompanyInfo>
        <ContactInfo>
          Tel. 010-5693-6727 | E-mail : <a href="mailto:oinsnio24@gmail.com">oinsnio24@gmail.com</a>
        </ContactInfo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;