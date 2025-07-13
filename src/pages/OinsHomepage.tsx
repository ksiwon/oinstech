import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import Footer from '../components/Footer';
import ConfirmationModal from '../components/ConfirmationModal';

// 애니메이션 키프레임
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Header = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${props => props.$isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.black};
  font-family: ${theme.typography.T3.fontFamily};
  font-weight: ${theme.typography.T3.fontWeight};
  font-size: ${theme.typography.T3.fontSize};
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.turkey[600]});
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover {
    color: ${theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const AccessButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
  color: ${theme.colors.white};
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-family: ${theme.typography.T5.fontFamily};
  font-weight: ${theme.typography.T4.fontWeight};
  font-size: ${theme.typography.T6.fontSize};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(87, 151, 253, 0.4);
    
    &::before {
      left: 100%;
    }
  }
`;

const HeroSection = styled.section`
  padding: 10rem 2rem 6rem;
  color: ${theme.colors.white};
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background-image: url('/assets/hero_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: -1;
  }
`;

const HeroWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 0;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroTextContent = styled.div`
  ${css`
    animation: ${fadeInUp} 1s ease;
  `}
`;

const HeroImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${css`
    animation: ${slideInRight} 1s ease 0.3s both;
  `}
  margin-left: 3rem;
  
  @media (max-width: 968px) {
    margin-left: 0;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  ${css`
    animation: ${float} 6s ease-in-out infinite;
  `}
`;

const HeroTitle = styled.h1`
  font-family: ${theme.typography.T1.fontFamily};
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: ${theme.typography.T1.fontWeight};
  margin-bottom: 2rem;
  line-height: 1.2;
  color: ${theme.colors.white};
  text-align: left;
  ${css`
    animation: ${fadeInUp} 1s ease 0.4s both;
  `}
  
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(45deg, ${theme.colors.purple[600]}, ${theme.colors.orange[300]}, ${theme.colors.yellow[600]}, ${theme.colors.turkey[600]}, ${theme.colors.blue[600]});
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 4s ease-in-out infinite;
`;

const HeroSubtitle = styled.p`
  font-family: ${theme.typography.T3.fontFamily};
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: ${theme.typography.T5.fontWeight};
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
  text-align: left;
  ${css`
    animation: ${fadeInUp} 1s ease 0.6s both;
  `}
  
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 4rem;
  ${css`
    animation: ${fadeInUp} 1s ease 0.8s both;
  `}
  
  @media (max-width: 968px) {
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.white}, ${theme.colors.gray[100]});
  color: ${theme.colors.blue[600]};
  border: none;
  padding: 1.2rem;
  border-radius: 50px;
  font-family: ${theme.typography.T3.fontFamily};
  font-size: ${theme.typography.T4.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    color: ${theme.colors.white};
    
    &::before {
      opacity: 1;
    }
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${theme.colors.white};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1.2rem;
  border-radius: 50px;
  font-family: ${theme.typography.T3.fontFamily};
  font-size: ${theme.typography.T4.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const ContentSection = styled.section<{ $bgColor?: string; $bgImage?: string }>`
  background: ${props => props.$bgImage ? props.$bgImage : (props.$bgColor || theme.colors.white)};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, ${theme.colors.blue[100]}, ${theme.colors.blue[300]});
  color: ${theme.colors.blue[600]};
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-family: ${theme.typography.T6.fontFamily};
  font-size: ${theme.typography.T6.fontSize};
  font-weight: ${theme.typography.T4.fontWeight};
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.typography.T1.fontFamily};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: ${theme.typography.T1.fontWeight};
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, ${theme.colors.blue[600]}, ${theme.colors.blue[300]}, ${theme.colors.blue[600]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
`;

const SectionSubtitle = styled.p`
  font-family: ${theme.typography.T3.fontFamily};
  font-size: ${theme.typography.T3.fontSize};
  font-weight: ${theme.typography.T5.fontWeight};
  color: ${theme.colors.gray[400]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TechGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const TechRow = styled.div<{ $isReverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6rem;
  margin-bottom: 2rem;
  flex-direction: ${props => props.$isReverse ? 'row-reverse' : 'row'};
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const getSlideAnimation = (delay: number, isLeft: boolean) => css`
  animation: ${isLeft ? slideInLeft : slideInRight} 0.8s ease ${delay * 0.3}s forwards;
`;

const TechContent = styled.div<{ $delay: number }>`
  flex: 1;
  opacity: 0;
  transform: translateX(${props => props.$delay % 2 === 0 ? '-50px' : '50px'});

  &.visible {
    ${props => getSlideAnimation(props.$delay, props.$delay % 2 === 0)}
  }
`;

const TechVisual = styled.div<{ $delay: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
  opacity: 0;
  transform: translateX(${props => props.$delay % 2 === 0 ? '50px' : '-50px'});

  &.visible {
    ${props => getSlideAnimation(props.$delay + 0.1, props.$delay % 2 !== 0)}
  }
`;

const TechCard = styled.div`
  background: ${theme.colors.white};
  padding: 1rem 2rem;
  max-width: 400px;
  border-radius: 24px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.turkey[600]});
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const LargeTechIcon = styled.div`
  width: 160px;
  height: 160px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 4rem;
  color: ${theme.colors.white};
  ${css`
    animation: ${glow} 3s ease-in-out infinite;
  `}
`;

const TechTitle = styled.h3`
  font-family: ${theme.typography.T2.fontFamily};
  font-size: ${theme.typography.T2.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  color: ${theme.colors.primary};
`;

const TechDescription = styled.p`
  font-family: ${theme.typography.T5.fontFamily};
  font-size: ${theme.typography.T5.fontSize};
  font-weight: ${theme.typography.T5.fontWeight};
  color: ${theme.colors.black};
  text-align: left;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const TechFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
`;

const TechFeature = styled.li`
  font-family: ${theme.typography.T6.fontFamily};
  font-size: ${theme.typography.T6.fontSize};
  font-weight: ${theme.typography.T6.fontWeight};
  color: ${theme.colors.gray[700]};
  margin-bottom: 0.8rem;
  padding-left: 1.8rem;
  position: relative;
  
  &::before {
    content: "✓";
    color: ${theme.colors.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: rgba(87, 151, 253, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
  }
`;

const TeamSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.black}, ${theme.colors.blue[800]});
  background-size: 400% 400%;
  animation: ${gradientShift} 4s ease-in-out infinite;
  color: ${theme.colors.white};
  padding: 8rem 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23334155" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TeamCard = styled.div<{ $delay: number }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 24px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  min-width: 280px;
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(87, 151, 253, 0.1), rgba(32, 182, 182, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.visible {
    ${props => css`
      animation: ${fadeInUp} 0.8s ease ${props.$delay * 0.1}s forwards;
    `}
  }
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const TeamPhoto = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.gray[200]};
  transition: border-color 0.3s ease;
  position: relative;
  z-index: 1;

  ${TeamCard}:hover & {
    border-color: ${theme.colors.primary};
  }
`;

const TeamInfo = styled.div`
  position: relative;
  z-index: 1;
`;

const TeamRole = styled.div`
  font-family: ${theme.typography.T2.fontFamily};
  font-size: ${theme.typography.T2.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  background: linear-gradient(135deg, ${theme.colors.blue[300]}, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.3rem;
`;

const TeamClass = styled.div`
  font-family: ${theme.typography.T4.fontFamily};
  font-size: ${theme.typography.T4.fontSize};
  font-weight: ${theme.typography.T4.fontWeight};
  opacity: 0.7;
`;

const TeamDetails = styled.ul`
  list-style: none;
  padding: 0;
  position: relative;
  z-index: 1;
  text-align: left;
`;

const TeamDetail = styled.li`
  font-family: ${theme.typography.T6.fontFamily};
  font-size: ${theme.typography.T6.fontSize};
  font-weight: ${theme.typography.T6.fontWeight};
  margin-bottom: 0.6rem;
  padding-left: 1.2rem;
  position: relative;
  opacity: 0.9;
  line-height: 1.4;
  
  &::before {
    content: "•";
    color: ${theme.colors.blue[300]};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 80%;
  aspect-ratio: 16 / 9;
  margin: 0 auto;
  background: ${theme.colors.gray[100]};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const ContactSection = styled.section`
  background: ${theme.colors.blue[100]};
  padding: 8rem 2rem;
  position: relative;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactCard = styled.div`
  background: ${theme.colors.white};
  padding: 1rem 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const ContactTitle = styled.h3`
  font-family: ${theme.typography.T2.fontFamily};
  font-size: ${theme.typography.T2.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  color: ${theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${theme.colors.gray[100]};
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.blue[100]};
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${theme.colors.white};
`;

const ContactText = styled.div`
  font-family: ${theme.typography.T5.fontFamily};
  font-size: ${theme.typography.T5.fontSize};
  font-weight: ${theme.typography.T5.fontWeight};
  color: ${theme.colors.black};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const AddressText = styled.p`
  font-family: ${theme.typography.T4.fontFamily};
  font-size: ${theme.typography.T4.fontSize};
  font-weight: ${theme.typography.T4.fontWeight};
  color: ${theme.colors.black};
  text-align: center;
  margin-top: 1rem;
  line-height: 1.5;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(10px);
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 90%;
  transform: scale(0.9);
  transition: transform 0.3s ease;
  position: relative;
  
  ${Modal}[data-open="true"] & {
    transform: scale(1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.gray[400]};
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[400]};
  }
`;

const ModalTitle = styled.h3`
  font-family: ${theme.typography.T2.fontFamily};
  font-size: ${theme.typography.T2.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, ${theme.colors.black}, ${theme.colors.blue[600]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ServiceButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ServiceButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  border: 2px solid ${theme.colors.gray[200]};
  border-radius: 12px;
  background: ${theme.colors.white};
  font-family: ${theme.typography.T4.fontFamily};
  font-size: ${theme.typography.T4.fontSize};
  font-weight: ${theme.typography.T4.fontWeight};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.blue[100]};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(87, 151, 253, 0.2);
  }
  
  &:first-child {
    color: ${theme.colors.blue[600]};
    
    &:hover {
      background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
      color: ${theme.colors.white};
      border-color: ${theme.colors.primary};
    }
  }
  
  &:last-child {
    color: ${theme.colors.purple[600]};
    
    &:hover {
      background: linear-gradient(135deg, ${theme.colors.purple[600]}, ${theme.colors.purple[700]});
      color: ${theme.colors.white};
      border-color: ${theme.colors.purple[600]};
    }
  }
`;

const CompanyBadge = styled.div`
  display: inline-block;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  padding: 0.8rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: ${theme.typography.T5.fontFamily};
  font-size: ${theme.typography.T5.fontSize};
  font-weight: ${theme.typography.T4.fontWeight};
  color: ${theme.colors.white};
  ${css`
    animation: ${fadeInUp} 1s ease 0.2s both;
  `}
`;

// Main Component
const OinsHomepage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  
  // 각 섹션별 ref 추가
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const techCardsRef = useRef<HTMLDivElement>(null);
  const teamCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Tech cards 관찰
    if (techCardsRef.current) {
      const techCards = techCardsRef.current.querySelectorAll('[data-card]');
      techCards.forEach(card => observer.observe(card));
    }

    // Team cards 관찰
    if (teamCardsRef.current) {
      const teamCards = teamCardsRef.current.querySelectorAll('[data-card]');
      teamCards.forEach(card => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  // 스무스 스크롤 함수
  const smoothScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleRecruitClick = () => {
    setIsRecruitModalOpen(true);
  };

  const handleRecruitModalClose = () => {
    setIsRecruitModalOpen(false);
  };

  const handleAccessClick = () => {
    setIsModalOpen(true);
  };

  const handleServiceSelect = (service: 'dab4n' | 'socra') => {
    if (service === 'dab4n') {
      window.open('https://dab4n.oinstech.com', '_blank');
    } else {
      window.open('https://socra.oinstech.com', '_blank');
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogoClick = () => {
    smoothScrollTo(heroRef);
  };

  const techFeatures = [
    {
      icon: '🧠',
      title: '교과 특화 AI 모델',
      description: '과목 도메인에 특화된 AI FT(Fine-Tuning) 모델을 제작하여 구시대적인 시험 운영과 반복적인 수업 채점을 자동화합니다.',
      features: [
        '현장 학습 자료 기반 응용·추론 중심 훈련',
        '도메인 특화 접근으로 경량화된 AI 모델 구현',
        '세분화된 전문성 확보 및 리소스 절감',
        '빠른 추론 속도로 실시간 처리 가능'
      ]
    },
    {
      icon: '📝',
      title: 'AI 필기체 OCR & 채점',
      description: '과목 전용 AI 모델로 도메인 연산자 및 필기체 인식을 최적화하여 정확한 채점과 클레임 처리를 제공합니다.',
      features: [
        'OCR 판독 정확성 대폭 향상',
        '일관된 채점 모델 기반 학생별 풀이 채점',
        '챗봇을 통한 자동 클레임 진행',
        '다양한 필기체 스타일 인식 지원'
      ]
    },
    {
      icon: '🔗',
      title: 'LMS 연동 플랫폼',
      description: '기존 대학 LMS 시스템과 쉽게 연동하여 전체 채점 프로세스를 단일 대시보드에서 관리할 수 있습니다.',
      features: [
        '기존 LMS 시스템과 간편한 연동',
        '학생 제출물 자동 수집부터 피드백까지',
        '전 과정 단일 대시보드 관리',
        'API 기반 실시간 데이터 동기화'
      ]
    },
    {
      icon: '📊',
      title: '실시간 분석 리포트',
      description: '채점 진행 상황과 성과를 실시간으로 시각화하여 교육 품질 향상과 운영 효율성을 제고합니다.',
      features: [
        '채점 진행 상황, 평균 점수, 오답률 시각화',
        '학교별·과목별 비교 분석 기능',
        '교육 품질 향상 및 운영 효율성 제고',
        '맞춤형 인사이트 및 개선 방안 제공'
      ]
    }
  ];

  const teamMembers = [
    {
      role: "CEO",
      name: "오상근",
      class: "KAIST",
      image: `/assets/ceo.png`,
      details: [
        "KAIST 전산학부 학사",
        "KAIST 전산학부 부학생회장 및 중앙운영위원",
        "KAIST 학부 동아리연합회장 및 전체학생대표자회의 대의원",
        "KAROST PM"
      ]
    },
    {
      role: "CTO",
      name: "이도운",
      class: "KAIST",
      image: `/assets/cto.png`,
      details: [
        "KAIST 융합인재학부 학사",
        "컴퓨터비전, 드론 강화학습 연구(CLAB)",
        "前 (주)제로엑스플로우 인턴",
        "캄보디아 영어회화 교육 로봇 하드웨어 개발 팀장"
      ]
    },
    {
      role: "COO",
      name: "윤성수",
      class: "KAIST",
      image: `/assets/coo.png`,
      details: [
        "KAIST 전산학부 학사",
        "딥러닝·강화학습 기반 AI 연구 및 학술 논문 집필",
        "KAROST Backend APM"
      ]
    },
    {
      role: "CCO",
      name: "박정원",
      class: "KAIST",
      image: `/assets/cco.png`,
      details: [
        "KAIST 산업디자인학과, 전산학부 학사",
        "KAIST 전산학부 학생회장",
        "KAIST SPARCS 디자이너",
        "KAIST AI Experience Lab 인턴"
      ]
    },
    {
      role: "CIO",
      name: "박대훈",
      class: "KAIST",
      image: `/assets/cio.png`,
      details: [
        "KAIST 전산학부 학사",
        "KAIST 전산학부 집행위원",
        "제32기 정보올림피아드 겨울학교 수료"
      ]
    }
  ];

  return (
    <Container>
      <Header $isScrolled={isScrolled}>
        <Nav>
          <Logo onClick={handleLogoClick}>
            <LogoImage 
              src="/assets/Blue_Logo.png" 
              alt="OINS 로고"
            />
          </Logo>
          <NavLinks>
            <NavLink onClick={() => smoothScrollTo(techRef)}>기술</NavLink>
            <NavLink onClick={() => smoothScrollTo(teamRef)}>팀</NavLink>
            <NavLink onClick={() => smoothScrollTo(aboutRef)}>회사소개</NavLink>
            <NavLink onClick={() => smoothScrollTo(contactRef)}>문의</NavLink>
          </NavLinks>
          <AccessButton onClick={handleAccessClick}>
            AI 채점 시스템 접속
          </AccessButton>
        </Nav>
      </Header>

      <HeroSection ref={heroRef}>
        <HeroWrapper>
          <HeroTextContent>
            <HeroTitle>
              교육의 새로운<br />
              <GradientText>패러다임</GradientText>을<br />
              만들어 갑니다
            </HeroTitle>
            
            <HeroSubtitle>
              OINS는 교육기관과 학습자에게 혁신적인<br />
              학습 환경과 방식을 제공하여 미래 교육을<br />
              새롭게 정의하는 에듀테크 스타트업입니다.<br />
              <br />
              <strong>교수·조교·학생 모두에게 보다 투명하고<br />
              신뢰성 높은 평가 경험을 제공합니다.<br />
              </strong>
            </HeroSubtitle>

            <CTAButtons>
              <PrimaryButton onClick={handleAccessClick}>
                AI 채점 시스템 체험하기
              </PrimaryButton>
              <SecondaryButton onClick={() => smoothScrollTo(techRef)}>
                서비스 둘러보기
              </SecondaryButton>
            </CTAButtons>
          </HeroTextContent>
          
          <HeroImageContent>
            <HeroImage 
              src="/assets/hero_ai.png" 
              alt="AI 교육 솔루션"
            />
          </HeroImageContent>
        </HeroWrapper>
      </HeroSection>

      <ContentSection ref={techRef} $bgColor={theme.colors.gray[100]}>
        <ContentContainer>
          <SectionHeader>
            <SectionBadge>💡 혁신 기술</SectionBadge>
            <SectionTitle>OINS만의 차별화된 기술력</SectionTitle>
            <SectionSubtitle>
              채점 업무의 시간·인력 비용 부담을 최소화하고,<br />
              모든 교육 참여자에게 신뢰할 수 있는 평가 시스템을 제공합니다.
            </SectionSubtitle>
          </SectionHeader>
          
          <TechGrid ref={techCardsRef}>
            {techFeatures.map((feature, index) => (
              <TechRow key={index} $isReverse={index % 2 === 1}>
                <TechContent $delay={index} data-card>
                  <TechCard>
                    <TechDescription>{feature.description}</TechDescription>
                    <TechFeatures>
                      {feature.features.map((item, itemIndex) => (
                        <TechFeature key={itemIndex}>{item}</TechFeature>
                      ))}
                    </TechFeatures>
                  </TechCard>
                </TechContent>
                <TechVisual $delay={index} data-card>
                  <LargeTechIcon>{feature.icon}</LargeTechIcon>
                  <TechTitle>{feature.title}</TechTitle>
                </TechVisual>
              </TechRow>
            ))}
          </TechGrid>
        </ContentContainer>
      </ContentSection>

      <TeamSection ref={teamRef}>
        <ContentContainer>
          <SectionHeader>
            <SectionBadge style={{background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`, color: theme.colors.blue[300], border: `1px solid rgba(255,255,255,0.2)`}}>
              👥 팀 소개
            </SectionBadge>
            <SectionTitle>
              KAIST 출신 엘리트 개발팀
            </SectionTitle>
            <SectionSubtitle style={{ color: 'rgba(255,255,255,0.8)' }}>
              뛰어난 기술력과 교육 현장 경험을 바탕으로<br />
              혁신적인 교육 솔루션을 개발하는 전문가들입니다.
            </SectionSubtitle>
          </SectionHeader>
          
          <TeamGrid ref={teamCardsRef}>
            {teamMembers.map((member, index) => (
              <TeamCard key={index} $delay={index} data-card>
                <TeamHeader>
                  <TeamPhoto
                    src={member.image}
                    alt={`${member.name} 프로필`}
                  />
                  <TeamInfo>
                    <TeamRole>{member.role} {member.name}</TeamRole>
                    <TeamClass>{member.class}</TeamClass>
                  </TeamInfo>
                </TeamHeader>
                <TeamDetails>
                  {member.details.map((detail, detailIndex) => (
                    <TeamDetail key={detailIndex}>{detail}</TeamDetail>
                  ))}
                </TeamDetails>
              </TeamCard>
            ))}
          </TeamGrid>
        </ContentContainer>
      </TeamSection>

      <ContentSection ref={aboutRef} $bgColor={theme.colors.white}>
        <ContentContainer>
          <SectionHeader>
            <SectionBadge>🏢 회사소개</SectionBadge>
            <SectionTitle>OINS의 교육 혁신 스토리</SectionTitle>
            <SectionSubtitle>
              교육 현장의 실제 문제를 해결하기 위해 시작된 OINS의 여정과<br />
              AI 기술을 통한 교육 평가 시스템의 혁신 과정을 담았습니다.
            </SectionSubtitle>
          </SectionHeader>
          <VideoWrapper>
            <StyledIframe
              src="https://www.youtube.com/embed/DWAvm2FR4bs"
              title="OINS 회사 소개 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
        </ContentContainer>
      </ContentSection>

      <ContactSection ref={contactRef}>
        <ContentContainer>
          <SectionHeader>
            <SectionBadge>📞 문의하기</SectionBadge>
            <SectionTitle>언제든지 연락주세요</SectionTitle>
            <SectionSubtitle>
              OINS의 AI 채점 시스템에 대해 궁금한 점이 있으시면<br />
              언제든지 편하게 문의해주세요.
            </SectionSubtitle>
          </SectionHeader>
          
          <ContactGrid>
            <ContactCard>
              <ContactTitle>Contact</ContactTitle>
              <ContactInfo>
                <ContactItem>
                  <ContactIcon>📞</ContactIcon>
                  <ContactText>010-5693-6727</ContactText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>✉️</ContactIcon>
                  <ContactText>oinsnio24@gmail.com</ContactText>
                </ContactItem>
              </ContactInfo>
            </ContactCard>
            
            <ContactCard>
              <ContactTitle>채용 안내</ContactTitle>
              <ContactInfo>
                <ContactItem>
                  <ContactIcon>💼</ContactIcon>
                  <ContactText>함께 성장할 동료를 찾고 있습니다</ContactText>
                </ContactItem>
              </ContactInfo>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <PrimaryButton 
                  onClick={handleRecruitClick}
                  style={{
                    fontSize: '0.9rem',
                    padding: '0.8rem 1.5rem',
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]})`,
                    color: theme.colors.white,
                    marginBottom: '1.8rem',
                  }}
                >
                  채용 공고 보기
                </PrimaryButton>
              </div>
            </ContactCard>
          </ContactGrid>
            
          <ContactGrid style={{ marginTop: '3rem' }}>
            <ContactCard style={{ gridColumn: '1 / -1' }}>
              <ContactTitle>오시는 길</ContactTitle>
              <AddressText>
                대전광역시 유성구 대학로 291 W8 교육지원동 314호
              </AddressText>
              <MapContainer>
                <MapIframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3214.2841234567890!2d127.35759331531842!3d36.36996478004445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654bb7bf479483%3A0x36d2732f1f0dcbc0!2z6rWQ7Jyh7KeA7JuQ64-ZKFc4KQ!5e0!3m2!1sko!2skr!4v1632987654321!5m2!1sko!2skr"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </MapContainer>
            </ContactCard>
          </ContactGrid>
        </ContentContainer>
      </ContactSection>

      <ContentSection $bgImage="url('/assets/vision_bg.png')" style={{ filter: 'brightness(1.3)' }}>
        <ContentContainer>
          <SectionHeader>
            <CompanyBadge>
              Our Insights, New Solution
            </CompanyBadge>
            <SectionTitle>교육의 미래를 함께 만들어갑니다</SectionTitle>
            <SectionSubtitle>
              OINS의 AI 기술로 더욱 효율적이고 정확한 교육 평가 시스템을 경험해보세요.<br />
              교육 현장의 혁신적 변화가 여기서 시작됩니다.
            </SectionSubtitle>
          </SectionHeader>
          
          <div style={{textAlign: 'center', marginTop: '3rem'}}>
            <PrimaryButton 
              onClick={handleAccessClick}
              style={{
                fontSize: theme.typography.T3.fontSize,
                padding: '1.5rem 3rem',
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]})`,
                color: theme.colors.white
              }}
            >
              지금 바로 시작하기
            </PrimaryButton>
          </div>
        </ContentContainer>
      </ContentSection>

      <Footer />

      <Modal $isOpen={isModalOpen} data-open={isModalOpen} onClick={handleModalClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleModalClose}>×</CloseButton>
          <ModalTitle>AI 채점 시스템 선택</ModalTitle>
          <ServiceButtons>
            <ServiceButton onClick={() => handleServiceSelect('dab4n')}>
              📝 DAB4N
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                AI 기반 채점 시스템
              </div>
            </ServiceButton>
            <ServiceButton onClick={() => handleServiceSelect('socra')}>
              🧠 SOCRA
              <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                AI 구술 시험 플랫폼
              </div>
            </ServiceButton>
          </ServiceButtons>
        </ModalContent>
      </Modal>

      <ConfirmationModal
        isOpen={isRecruitModalOpen}
        onClose={handleRecruitModalClose}
        onConfirm={handleRecruitModalClose}
        title="채용 안내"
        message="현재 채용 공고 기간이 아닙니다."
        confirmText="확인"
        showCancelButton={false}
      />
    </Container>
  );
};

export default OinsHomepage;