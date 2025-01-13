import styled from "styled-components";

// 전체 Wrapper 스타일
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
`;

// 체크박스의 외부 컨테이너
export const CheckBoxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

// 체크박스 아이콘 스타일
export const CheckBoxIcon = styled.svg<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.white};
  border: 2px solid
    ${({ theme, checked }) =>
      checked ? theme.colors.primary : theme.colors.blue[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  transition: background-color 0.2s ease, border-color 0.2s ease;

  path {
    transition: fill 0.2s ease;
  }
`;

// 체크박스 라벨 스타일
export const Label = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.black};
`;
