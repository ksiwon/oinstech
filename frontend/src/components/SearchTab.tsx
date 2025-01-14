// SearchTab.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchTabProps {
  onSearch: (value: string) => void; // onSearch 콜백 함수 타입 정의
}

const SearchTab: React.FC<SearchTabProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value.trim());
    }
  };

  const handleSearchClick = () => {
    onSearch(value.trim());
  };

  return (
    <SearchTabWrapper>
      <Input
        type="text"
        placeholder="이름을 입력해주세요."
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        isFilled={value.length > 0}
      />
      <SearchIcon onClick={handleSearchClick} style={{ cursor: "pointer" }} />
    </SearchTabWrapper>
  );
};

export default SearchTab;

export const SearchTabWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box; /* 여백 포함 크기 계산 */
`;

export const Input = styled.input<{ isFilled: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-family: "Pretendard";
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
  color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.black : theme.colors.gray[200]};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }
  min-width: 0; /* flexbox에서 축소 가능하도록 설정 */
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.black};
  flex-shrink: 0; /* 아이콘 크기 고정 */
  cursor: pointer; /* 클릭 가능한 상태로 설정 */
`;