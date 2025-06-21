import React from 'react';
import styled from 'styled-components';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  showCancelButton: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  showCancelButton
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ModalMessage>{message}</ModalMessage>
        </ModalBody>
        <ModalFooter>
          {showCancelButton && (
            <ModalButton $variant="secondary" onClick={onClose}>
              취소
            </ModalButton>
          )}
          <ModalButton $variant="primary" onClick={onConfirm}>
            {confirmText}
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(10px);
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
`;

const ModalTitle = styled.h3`
  font-family: ${(props) => props.theme.typography.T2.fontFamily};
  font-size: ${(props) => props.theme.typography.T2.fontSize};
  font-weight: ${(props) => props.theme.typography.T2.fontWeight};
  color: ${(props) => props.theme.colors.black};
  margin: 0;
  text-align: center;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalMessage = styled.p`
  font-family: ${(props) => props.theme.typography.T5.fontFamily};
  font-size: ${(props) => props.theme.typography.T5.fontSize};
  font-weight: ${(props) => props.theme.typography.T5.fontWeight};
  color: ${(props) => props.theme.colors.gray[400]};
  line-height: 1.6;
  margin: 0;
  text-align: center;
`;

const ModalFooter = styled.div`
  padding: 1rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ModalButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-family: ${(props) => props.theme.typography.T5.fontFamily};
  font-weight: ${(props) => props.theme.typography.T4.fontWeight};
  font-size: ${(props) => props.theme.typography.T5.fontSize};
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.blue[600]});
    color: ${props.theme.colors.white};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(87, 151, 253, 0.3);
    }
  ` : `
    background: ${props.theme.colors.gray[100]};
    color: ${props.theme.colors.gray[400]};
    
    &:hover {
      background: ${props.theme.colors.gray[200]};
      transform: translateY(-2px);
    }
  `}
`;