import React from "react";
import { CheckBoxContainer, CheckBoxIcon, Label, Wrapper } from "./CheckBox.styles";

interface CheckBoxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, label, onChange }) => {
  return (
    <CheckBoxContainer onClick={onChange}>
      <CheckBoxIcon checked={checked}>
        {checked && (
          <path
            d="M20.3077 0H3.69231C2.71337 0 1.85692 0.408407 1.20692 1.05841C0.556921 1.70841 0.148514 2.56486 0.148514 3.54379V20.3077C0.148514 21.2866 0.556921 22.1431 1.20692 22.7931C1.85692 23.4431 2.71337 23.8515 3.69231 23.8515H20.3077C21.2866 23.8515 22.1431 23.4431 22.7931 22.7931C23.4431 22.1431 23.8515 21.2866 23.8515 20.3077V3.54379C23.8515 2.56486 23.4431 1.70841 22.7931 1.05841C22.1431 0.408407 21.2866 0 20.3077 0ZM10.8226 15.6L5.69615 10.4736L7.06487 9.10483L10.8226 12.8626L17.8046 5.88064L19.1733 7.24936L10.8226 15.6Z"
            fill="currentColor"
          />
        )}
      </CheckBoxIcon>
      <Label>{label}</Label>
    </CheckBoxContainer>
  );
};

interface CheckBoxWrapperProps {
  options: string[]; // 체크박스 옵션 리스트
  selectedIndices: number[]; // 선택된 체크박스 인덱스
  onSelectionChange: (selected: number[]) => void; // 선택 변경 이벤트
}

const CheckBoxWrapper: React.FC<CheckBoxWrapperProps> = ({
  options,
  selectedIndices,
  onSelectionChange,
}) => {
  const handleChange = (index: number) => {
    const updatedSelection = selectedIndices.includes(index)
      ? selectedIndices.filter((item) => item !== index) // 이미 선택된 경우 제거
      : [...selectedIndices, index]; // 새로 선택된 경우 추가

    onSelectionChange(updatedSelection); // 부모 컴포넌트로 업데이트 전달
  };

  return (
    <Wrapper>
      {options.map((option, index) => (
        <CheckBox
          key={index}
          checked={selectedIndices.includes(index)}
          label={option}
          onChange={() => handleChange(index)}
        />
      ))}
    </Wrapper>
  );
};

export default CheckBoxWrapper;
