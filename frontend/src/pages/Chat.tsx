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

  // Normalize user IDs to create a consistent room ID
  const [sortedUserId, sortedPartnerId] = [userId, partnerId].sort();
  const roomId = `${sortedUserId}-${sortedPartnerId}`;

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
    socket.emit("joinRoom", { id1: sortedUserId, id2: sortedPartnerId });

    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [sortedUserId, sortedPartnerId]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        sender: sortedUserId,
        timestamp: new Date().toISOString(),
        isSent: true,
      };

      try {
        await axios.post(`http://localhost:5000/chat/${sortedUserId}/${sortedPartnerId}`, message);
      } catch (error) {
        console.error("Failed to send message via REST API:", error);
      }

      socket.emit("sendMessage", { id1: sortedUserId, id2: sortedPartnerId, ...message });

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
          {/* Other ChatList components */}
        </LeftWrapper>

        <RightWrapper>
          <ChatHeader>
            <BackUserWrapper>
              <Back>
                <i className="fas fa-chevron-left" />
              </Back>
              <UserWrapper>
                <UserSection>{partnerId}</UserSection>
                <UserGrade>고2</UserGrade>
              </UserWrapper>
            </BackUserWrapper>
            <DetailsSection>
              <Answer type={"unread"} />
              <DateText>1시간 전</DateText>
            </DetailsSection>
          </ChatHeader>
          <ChatContent>
            <MessagesWrapper>
              {messages.map((msg, index) => (
                <MessageBubble key={index} isSent={msg.sender === sortedUserId}>
                  <strong>{msg.sender}</strong>: {msg.text}
                </MessageBubble>
              ))}
            </MessagesWrapper>

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
`;

const RightWrapper = styled.div`
  flex-grow: 1;
  padding: 12px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
`;

const BackUserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Back = styled.div`
  cursor: pointer;
  margin-right: 12px;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserSection = styled.div``;
const UserGrade = styled.div`
  font-size: 12px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const DateText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessagesWrapper = styled.div`
  flex-grow: 1;
  margin-bottom: 12px;
`;

const MessageBubble = styled.div<{ isSent: boolean }>`
  background-color: ${({ isSent, theme }) => (isSent ? theme.colors.primary : theme.colors.gray[100])};
  padding: 8px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const SendButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
`;

