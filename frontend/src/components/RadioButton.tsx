import React, { useState } from "react";
import {
  RadioButtonContainer,
  RadioButtonIcon,
  Label,
  Wrapper,
} from "./RadioButton.styles";

interface RadioButtonProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ checked, label, onChange }) => {
  return (
    <RadioButtonContainer onClick={onChange}>
      <RadioButtonIcon checked={checked}>
        {checked && <circle cx="12" cy="12" r="6" fill="currentColor" />}
      </RadioButtonIcon>
      <Label>{label}</Label>
    </RadioButtonContainer>
  );
};

interface RadioButtonWrapperProps {
  options: string[]; // 라벨 리스트
  onSelect: (selectedIndex: number | null) => void; // 선택된 옵션의 인덱스를 전달하는 콜백
}

const RadioButtonWrapper: React.FC<RadioButtonWrapperProps> = ({
  options,
  onSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRadioButtonChange = (index: number) => {
    setSelectedIndex(index); // 선택된 인덱스 업데이트
    onSelect(index); // 콜백 호출
  };

  return (
    <Wrapper>
      {options.map((label, index) => (
        <RadioButton
          key={index}
          checked={index === selectedIndex}
          label={label}
          onChange={() => handleRadioButtonChange(index)}
        />
      ))}
    </Wrapper>
  );
};

export default RadioButtonWrapper;
