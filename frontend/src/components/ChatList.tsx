// src/components/ChatList.tsx
import React from "react";
import Answer from "../components/Answer";
import styled from "styled-components";

interface ChatListProps {
  username: string;
  usergrade: string;
  answerTime: string;
  answerType: "replied" | "read" | "unread";
  clicked: boolean;
}

const ChatList: React.FC<ChatListProps> = (props) => {
    return (
        <ChatListWrapper clicked={props.clicked}>
            <UserWrapper>
                <UserSection clicked={props.clicked}>{props.username}</UserSection>
                <UserGrade clicked={props.clicked}>{props.usergrade}</UserGrade>
            </UserWrapper>
            <DetailsSection>
            <Answer type={props.answerType} />
            <DateText clicked={props.clicked}>{props.answerTime}</DateText>
            </DetailsSection>
        </ChatListWrapper>
    );
};

export default ChatList;

const ChatListWrapper = styled.div<{ clicked: boolean }>`
    display: inline-flex;
    padding: 16px 32px;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme, clicked }) => clicked ? theme.colors.blue[800] : theme.colors.blue[100]};
    cursor: pointer;
`;

const UserWrapper = styled.div`
    display: flex;
    width: 120px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
`;

const UserSection = styled.div<{ clicked: boolean }>`
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
  color: ${({ theme, clicked }) => clicked ? theme.colors.white : theme.colors.black};
`;

const UserGrade = styled.div<{ clicked: boolean }>`
    font-size: ${({ theme }) => theme.typography.T6.fontSize};
    font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
    color: ${({ theme, clicked }) => clicked ? theme.colors.white : theme.colors.black};
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const DateText = styled.div<{ clicked: boolean }>`
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
  color: ${({ theme, clicked }) => clicked ? theme.colors.white : theme.colors.black};
`;