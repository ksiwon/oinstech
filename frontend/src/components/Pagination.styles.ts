import styled from "styled-components";

export const PaginationButton = styled.button<{ filled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: ${({ filled, theme }) =>
    filled ? theme.colors.white : theme.colors.primary};
  color: ${({ filled, theme }) =>
    filled ? theme.colors.primary : theme.colors.white};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};

  &:hover {
    opacity: 0.8;
  }
`;

export const PaginationWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  gap: 0px;
  padding: 16px 0;
`;