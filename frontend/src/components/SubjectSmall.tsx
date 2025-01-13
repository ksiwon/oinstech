import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

// Styled Components
const SubjectWrapper = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color, theme }) => (theme.colors[color as keyof typeof theme.colors] as any)[600]};
  width: 50px;
  height: 27px;
  border-radius: 16px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.T7.fontSize};
  font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
  text-align: center;
`;

const SubjectListWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 4px;
    align-self: stretch;
    flex-wrap: wrap;
`;

// 과목과 색상 매핑
const colorMapping: Record<string, keyof typeof theme.colors> = {
  국어: "red",
  영어: "red",
  수학: "blue",
  물리: "green",
  화학: "green",
  생물: "green",
  지학: "green",
  정보: "turkey",
};

// SubjectSmall Component
interface SubjectSmallProps {
  subjects: string[]; // 과목 리스트
}

const SubjectSmall: React.FC<SubjectSmallProps> = ({ subjects }) => {
  return (
    <SubjectListWrapper>
      {subjects.map((subject, index) => {
        const colorKey = colorMapping[subject] || "gray";
        const color = `${colorKey}`;

        return (
          <SubjectWrapper key={index} color={color}>
            <Text>{subject}</Text>
          </SubjectWrapper>
        );
      })}
    </SubjectListWrapper>
  );
};

export default SubjectSmall;
