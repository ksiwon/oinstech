// Answer.tsx
import React from "react";
import styled from "styled-components";

interface AnswerProps {
  type: "replied" | "read" | "unread";
}

const answerLabels = {
  replied: "답장 보냄",
  read: "답장 읽음",
  unread: "읽지 않은 답장",
};

const Answer: React.FC<AnswerProps> = ({ type }) => {
  return <Wrapper type={type}>{answerLabels[type]}</Wrapper>;
};

export default Answer;

const Wrapper = styled.div<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.T7.fontSize};
  font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "replied":
        return theme.colors.green[600];
      case "read":
        return theme.colors.yellow[600];
      case "unread":
        return theme.colors.red[600];
      default:
        return theme.colors.gray[200];
    }
  }};
`;