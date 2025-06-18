import styled, { css, keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import { useEffect, useRef, useState } from 'react';

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
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(-45deg, ${theme.colors.blue[600]}, ${theme.colors.primary}, ${theme.colors.turkey[600]}, ${theme.colors.blue[300]});
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%239C92AC" fill-opacity="0.05"><path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>') repeat;
    opacity: 0.1;
    pointer-events: none;
  }
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
  font-family: ${theme.typography.T2.fontFamily};
  font-size: 2rem;
  font-weight: ${theme.typography.T1.fontWeight};
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]}, ${theme.colors.turkey[600]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.turkey[600]}, ${theme.colors.yellow[600]});
    border-radius: 8px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
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
  font-family: ${theme.typography.T5.fontFamily};
  font-weight: ${theme.typography.T4.fontWeight};
  font-size: ${theme.typography.T5.fontSize};
  position: relative;
  transition: all 0.3s ease;
  
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
  text-align: center;
  color: ${theme.colors.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled.div`
  max-width: 1000px;
  ${css`
    animation: ${fadeInUp} 1s ease;
  `}
`;

const CompanyBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.8rem 2rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  font-family: ${theme.typography.T5.fontFamily};
  font-size: ${theme.typography.T5.fontSize};
  font-weight: ${theme.typography.T4.fontWeight};
  ${css`
    animation: ${fadeInUp} 1s ease 0.2s both;
  `}
`;

const HeroTitle = styled.h1`
  font-family: ${theme.typography.T1.fontFamily};
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: ${theme.typography.T1.fontWeight};
  margin-bottom: 2rem;
  line-height: 1.1;
  background: linear-gradient(135deg, ${theme.colors.white}, ${theme.colors.blue[100]}, ${theme.colors.blue[300]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ${css`
    animation: ${fadeInUp} 1s ease 0.4s both;
  `}
`;

const HeroSubtitle = styled.p`
  font-family: ${theme.typography.T3.fontFamily};
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: ${theme.typography.T5.fontWeight};
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
  ${css`
    animation: ${fadeInUp} 1s ease 0.6s both;
  `}
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  ${css`
    animation: ${fadeInUp} 1s ease 0.8s both;
  `}
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.white}, ${theme.colors.gray[100]});
  color: ${theme.colors.blue[600]};
  border: none;
  padding: 1.2rem 2.5rem;
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
  padding: 1.2rem 2.5rem;
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

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const FloatingShape = styled.div<{ $delay: number; $size: number; $left: string; $top: string }>`
  position: absolute;
  left: ${props => props.$left};
  top: ${props => props.$top};
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: linear-gradient(135deg, rgba(87, 151, 253, 0.1), rgba(32, 182, 182, 0.1));
  border-radius: 50%;
  ${props => css`
    animation: ${float} ${3 + props.$delay}s ease-in-out infinite;
  `}
  animation-delay: ${props => props.$delay}s;
`;

const ContentSection = styled.section<{ $bgColor?: string }>`
  background: ${props => props.$bgColor || theme.colors.white};
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
  background: linear-gradient(135deg, ${theme.colors.black}, ${theme.colors.blue[600]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  gap: 6rem;
  margin-bottom: 6rem;
`;

const TechRow = styled.div<{ $isReverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4rem;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  opacity: 0;
  transform: translateX(${props => props.$delay % 2 === 0 ? '50px' : '-50px'});

  &.visible {
    ${props => getSlideAnimation(props.$delay + 0.1, props.$delay % 2 !== 0)}
  }
`;

const TechCard = styled.div`
  background: ${theme.colors.white};
  padding: 3rem;
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

const TechIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: ${theme.colors.white};
  ${css`
    animation: ${glow} 3s ease-in-out infinite;
  `}
`;

const LargeTechIcon = styled(TechIcon)`
  width: 120px;
  height: 120px;
  font-size: 3rem;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
  ${css`
    animation: ${glow} 3s ease-in-out infinite;
  `}
`;

const TechTitle = styled.h3`
  font-family: ${theme.typography.T2.fontFamily};
  font-size: ${theme.typography.T2.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  margin-bottom: 1rem;
  color: ${theme.colors.black};
`;

const TechDescription = styled.p`
  font-family: ${theme.typography.T5.fontFamily};
  font-size: ${theme.typography.T5.fontSize};
  font-weight: ${theme.typography.T5.fontWeight};
  color: ${theme.colors.gray[400]};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const TechFeatures = styled.ul`
  list-style: none;
  padding: 0;
`;

const TechFeature = styled.li`
  font-family: ${theme.typography.T6.fontFamily};
  font-size: ${theme.typography.T6.fontSize};
  font-weight: ${theme.typography.T6.fontWeight};
  color: ${theme.colors.gray[400]};
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
  background: linear-gradient(135deg, ${theme.colors.black}, ${theme.colors.gray[400]});
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
  margin-top: 4rem;
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
  padding: 2.5rem;
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
  font-family: ${theme.typography.T3.fontFamily};
  font-size: ${theme.typography.T3.fontSize};
  font-weight: ${theme.typography.T2.fontWeight};
  background: linear-gradient(135deg, ${theme.colors.blue[300]}, ${theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.3rem;
`;

const TeamClass = styled.div`
  font-family: ${theme.typography.T6.fontFamily};
  font-size: ${theme.typography.T6.fontSize};
  font-weight: ${theme.typography.T6.fontWeight};
  opacity: 0.7;
`;

const TeamDetails = styled.ul`
  list-style: none;
  padding: 0;
  position: relative;
  z-index: 1;
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
  
  ${Modal}[data-open="true"] & {
    transform: scale(1);
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

const PasswordInput = styled.input`
  width: calc(100% - 3rem);
  padding: 1.2rem;
  border: 2px solid ${theme.colors.gray[200]};
  border-radius: 12px;
  font-family: ${theme.typography.T5.fontFamily};
  font-size: ${theme.typography.T5.fontSize};
  font-weight: ${theme.typography.T5.fontWeight};
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(87, 151, 253, 0.1);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModalButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-family: ${theme.typography.T5.fontFamily};
  font-weight: ${theme.typography.T4.fontWeight};
  font-size: ${theme.typography.T5.fontSize};
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.blue[600]});
    color: ${theme.colors.white};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(87, 151, 253, 0.3);
    }
  ` : `
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[400]};
    
    &:hover {
      background: ${theme.colors.gray[200]};
      transform: translateY(-2px);
    }
  `}
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.red[600]};
  font-family: ${theme.typography.T6.fontFamily};
  font-size: ${theme.typography.T6.fontSize};
  font-weight: ${theme.typography.T6.fontWeight};
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: ${theme.colors.red[100]};
  border-radius: 8px;
  border: 1px solid ${theme.colors.red[300]};
`;

const OinsHomepage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleAccessClick = () => {
    setIsModalOpen(true);
    setPassword('');
    setError('');
  };

  const handlePasswordSubmit = () => {
    if (password === 'oins314') {
      window.open('https://dab4u.oinstech.com', '_blank');
      setIsModalOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
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
      class: "KAIST CS '22",
      image: `/assets/ceo.png`,
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
      image: `/assets/cto.png`,
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
      image: `/assets/coo.png`,
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
      image: `/assets/cco.png`,
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
      image: `/assets/cio.png`,
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

  return (
    <Container>
      <Header $isScrolled={isScrolled}>
        <Nav>
          <Logo>OINS</Logo>
          <NavLinks>
            <NavLink href="#tech">기술</NavLink>
            <NavLink href="#team">팀</NavLink>
            <NavLink href="#about">회사소개</NavLink>
            <NavLink href="#contact">문의</NavLink>
          </NavLinks>
          <AccessButton onClick={handleAccessClick}>
            AI 채점 시스템 접속
          </AccessButton>
        </Nav>
      </Header>

      <HeroSection>
        <FloatingElements>
          <FloatingShape $delay={0} $size={60} $left="10%" $top="20%" />
          <FloatingShape $delay={1} $size={40} $left="85%" $top="15%" />
          <FloatingShape $delay={2} $size={80} $left="15%" $top="70%" />
          <FloatingShape $delay={0.5} $size={50} $left="90%" $top="60%" />
          <FloatingShape $delay={1.5} $size={30} $left="5%" $top="45%" />
        </FloatingElements>
        
        <HeroContent>
          <CompanyBadge>
            🚀 OINS · Our Insights, New Solution
          </CompanyBadge>
          
          <HeroTitle>
            AI 기술을 바탕으로<br />
            교육의 비효율을 혁신하여<br />
            <span style={{background: `linear-gradient(135deg, ${theme.colors.blue[300]}, ${theme.colors.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              교육의 새로운 패러다임
            </span>을<br />
            만들어 갑니다
          </HeroTitle>
          
          <HeroSubtitle>
            OINS는 교육기관과 학습자에게 혁신적인 학습 환경과 방식을 제공하여<br />
            미래 교육을 새롭게 정의하는 에듀테크 스타트업입니다.<br />
            <strong>교수·조교·학생 모두에게 보다 투명하고 신뢰성 높은 평가 경험을 제공합니다.</strong>
          </HeroSubtitle>

          <CTAButtons>
            <PrimaryButton onClick={handleAccessClick}>
              AI 채점 시스템 체험하기
            </PrimaryButton>
            <SecondaryButton>
              서비스 둘러보기
            </SecondaryButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <ContentSection id="tech">
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
                    <TechIcon>{feature.icon}</TechIcon>
                    <TechTitle>{feature.title}</TechTitle>
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
                </TechVisual>
              </TechRow>
            ))}
          </TechGrid>
        </ContentContainer>
      </ContentSection>

      <TeamSection id="team">
        <ContentContainer>
          <SectionHeader>
            <SectionBadge style={{background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`, color: theme.colors.blue[300], border: `1px solid rgba(255,255,255,0.2)`}}>
              👥 팀 소개
            </SectionBadge>
            <SectionTitle style={{ color: theme.colors.white }}>
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

      <ContentSection $bgColor={`linear-gradient(135deg, ${theme.colors.gray[100]} 0%, ${theme.colors.blue[100]} 100%)`}>
        <ContentContainer>
          <SectionHeader>
            <SectionBadge>🎯 비전</SectionBadge>
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

      <Modal $isOpen={isModalOpen} data-open={isModalOpen} onClick={handleModalClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>AI 채점 시스템 접속</ModalTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <PasswordInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="비밀번호를 입력하세요"
            autoFocus
          />
          <ModalButtons>
            <ModalButton $variant="secondary" onClick={handleModalClose}>
              취소
            </ModalButton>
            <ModalButton $variant="primary" onClick={handlePasswordSubmit}>
              접속하기
            </ModalButton>
          </ModalButtons>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default OinsHomepage;