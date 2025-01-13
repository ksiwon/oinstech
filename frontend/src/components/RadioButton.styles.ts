import styled from "styled-components";

export const RadioButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const RadioButtonIcon = styled.svg<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid
    ${({ theme, checked }) =>
      checked ? theme.colors.primary : theme.colors.blue[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  transition: border-color 0.2s ease;

  circle {
    transition: fill 0.2s ease;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
`;
