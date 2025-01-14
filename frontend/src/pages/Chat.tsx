import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import SearchTab from '../components/SearchTab';
import ChatList from '../components/ChatList';
import Answer from '../components/Answer';

const Chat: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태 관리
    const totalPages = 10; // 총 페이지 수 (예시로 10페이지로 설정)
    
    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단으로 스크롤 이동
    };
      
    return (
        <div>
            <Header />
            <WholeWrapper>
                <LeftWrapper>
                    <SearchTabWrapper>
                        <SearchTab onSearch={(value) => alert(value)} />
                    </SearchTabWrapper>
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"unread"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"1일 전"} answerType={"read"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"replied"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"unread"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"unread"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"unread"} clicked={false} />
                    <ChatList username={"김철수"} usergrade={"고2"} answerTime={"1시간 전"} answerType={"unread"} clicked={true} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"unread"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"1일 전"} answerType={"read"} clicked={false} />
                    <ChatList username={"이지은"} usergrade={"고2"} answerTime={"2025-01-01"} answerType={"replied"} clicked={false} />
                </LeftWrapper>
                <RightWrapper>
                    <ChatHeader>
                        <BackUserWrapper>
                            <Back>
                                <i className="fas fa-chevron-left" />
                            </Back>
                            <UserWrapper>
                                <UserSection>김철수</UserSection>
                                <UserGrade>고2</UserGrade>
                            </UserWrapper>
                        </BackUserWrapper>
                        <DetailsSection>
                        <Answer type={"unread"} />
                        <DateText>1시간 전</DateText>
                        </DetailsSection>
                    </ChatHeader>
                </RightWrapper>
            </WholeWrapper>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Footer />
        </div>
    );
};

export default Chat;

const LeftWrapper = styled.div`
    width: 320px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.primary};
`;

const SearchTabWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    width: 100%;
    height: 100px;
    box-sizing: border-box; /* 여백 포함 크기 계산 */
`;

const RightWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ChatHeader = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background-color: ${({ theme }) => theme.colors.primary};
    box-sizing: border-box;
`;

const WholeWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const BackUserWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    box-sizing: border-box;
`;

const Back = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 40px;
    color: ${({ theme }) => theme.colors.white};
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

const UserSection = styled.div`
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
  color: ${({ theme}) => theme.colors.white};
`;

const UserGrade = styled.div`
    font-size: ${({ theme }) => theme.typography.T6.fontSize};
    font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
    color: ${({ theme }) => theme.colors.white};
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const DateText = styled.div`
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  font-weight: ${({ theme }) => theme.typography.T7.fontWeight};
  color: ${({ theme }) => theme.colors.white};
`;