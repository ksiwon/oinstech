import styled from "styled-components";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import SearchTab from "../components/SearchTab";
import ChatList from "../components/ChatList";
import Answer from "../components/Answer";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const socket = io("http://localhost:5000");

interface Message {
  text: string;
  sender: string;
  timestamp: string;
  isSent: boolean;
}


const Chat: React.FC = () => {
  const { userId, partnerId } = useParams<{ userId: string; partnerId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Generate consistent roomId
  const roomId = [userId, partnerId].sort().join("-");

  // Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${userId}/${partnerId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
     fetchMessages();
     socket.emit("joinRoom", { id1: userId, id2: partnerId });
     console.log("Joining room", { id1: userId, id2: partnerId });

     socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("newMessage");
    };
  },  [userId, partnerId]);


  // Join WebSocket room and listen for new messages
  useEffect(() => {
    socket.emit("joinRoom", { id1: userId, id2: partnerId });
    console.log("Joining room", { id1: userId, id2: partnerId });
    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [userId, partnerId]);



  // Handle sending messages
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = { text: newMessage, sender: userId, timestamp: new Date().toISOString() };

      // Send message via REST API
      // try {
      //   await axios.post(`http://localhost:5000/chat/${userId}/${partnerId}`, message);
      // } catch (error) {
      //   console.error("Failed to send message via REST API:", error);
      // }

      // Emit message to WebSocket for real-time updates
      socket.emit("sendMessage", { id1: userId, id2: partnerId, ...message });

      // Update local state
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };


  return (
    <div>
      <Header />
      <WholeWrapper>
        <LeftWrapper>
          <SearchTabWrapper>
            <SearchTab onSearch={(value) => alert(value)} />
          </SearchTabWrapper>
                    <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                    <ChatList
            username={"김철수"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"replied"}
            clicked={true}
          />
                    <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                    <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                    <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                    <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                    <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                     <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                     <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />
                     <ChatList
            username={"이지은"}
            usergrade={"고2"}
            answerTime={"2025-01-01"}
            answerType={"unread"}
            clicked={false}
          />

 
          {/* 다른 ChatList 항목 생략 */}
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
          <ChatContent>
            {/* 메시지를 표시하는 영역 */}
            <MessagesWrapper>
              {messages.map((msg, index) => (
                <MessageBubble key={index} isSent={msg.sender === userId}>
                  <strong>{msg.sender}</strong>: {msg.text}
                </MessageBubble>
               
              ))}
            </MessagesWrapper>
            {/* 입력창과 전송 버튼 */}
            <InputWrapper>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
              />
              <SendButton onClick={handleSendMessage}>전송</SendButton>
            </InputWrapper>
          </ChatContent>
        </RightWrapper>
      </WholeWrapper>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      <Footer />
    </div>
  );
};

export default Chat;

// Styled Components
const WholeWrapper = styled.div`
  display: flex;
  width: 100%;
`;

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
  box-sizing: border-box;
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



const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const MessagesWrapper = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column; /* 메시지가 순서대로 쌓이도록 설정 */
  gap: 8px; /* 메시지 간 간격 */
`;

const MessageBubble = styled.div<{ isSent: boolean }>`
  max-width: 70%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 12px;
  background-color: ${({ isSent, theme }) =>
    isSent ? theme.colors.blue[300] : theme.colors.gray[200]};
  color: ${({ isSent, theme }) =>
    isSent ? theme.colors.white : theme.colors.black};
  align-self: ${({ isSent }) => (isSent ? "flex-end" : "flex-start")}; /* 위치 설정 */
  text-align: ${({ isSent }) => (isSent ? "right" : "left")}; /* 텍스트 정렬 */
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: inline-block;
  word-break: break-word; /* 긴 텍스트를 다음 줄로 자동으로 넘기기 */
`;


const InputWrapper = styled.div`
  display: flex;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.T7.fontSize};
`;

const SendButton = styled.button`
  margin-left: 8px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[800]};
  }
`;

const BackUserWrapper = styled.div`
  display: flex;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.white};
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
