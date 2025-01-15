import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTeacherData } from "../redux/slices/userSlice"; // Redux 액션 가져오기

const LoginTeacher: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Redux 디스패치 함수
    const [id, setId] = useState<string>(""); // ID 상태
    const [password, setPassword] = useState<string>(""); // 비밀번호 상태
    const [error, setError] = useState<string>(""); // 오류 메시지 상태

    // 회원가입 버튼 클릭 핸들러
    const handleSignupClick = () => {
        navigate("/signup/teacher");
    };

    // 로그인 버튼 클릭 핸들러
    const handleLoginClick = async () => {
        setError(""); // 오류 메시지 초기화
        try {
            // API 호출
            const response = await axios.post("http://localhost:5000/api/teachers/login", {
                id,
                password,
            });

            // Redux에 로그인 데이터 저장
            dispatch(setTeacherData(response.data));

            // 로그인 성공 후 대시보드로 이동
            navigate("/");
        } catch (err: any) {
            // 오류 처리
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("로그인 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <GlobalWrapper>
            <Header />
            <Wrapper>
                <ContentContainer>
                    {error && <ErrorText>{error}</ErrorText>} {/* 오류 메시지 표시 */}
                    <Content>
                        <ContentName>ID</ContentName>
                        <ContentInput>
                            <input
                                type="text"
                                id="teacher-id"
                                name="teacher-id"
                                value={id}
                                onChange={(e) => setId(e.target.value)} // ID 입력 핸들러
                                required
                            />
                        </ContentInput>
                    </Content>
                    <Content>
                        <ContentName>PW</ContentName>
                        <ContentInput>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 핸들러
                                required
                            />
                        </ContentInput>
                    </Content>
                </ContentContainer>
                <ButtonContainer>
                    <Button1 onClick={handleSignupClick}>회원가입</Button1>
                    <Button2 onClick={handleLoginClick}>로그인</Button2>
                </ButtonContainer>
            </Wrapper>
            <Footer />
        </GlobalWrapper>
    );
};

export default LoginTeacher;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 32px 192px;
    height: 100%;
`;

const ContentName = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    width: 32px;
    text-align: right;
    white-space: nowrap; /* 줄바꿈 방지 */
    margin-right: 16px;
    flex-shrink: 0;
`;

const ContentInput = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    margin: 0 auto 0 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    justify-content: center;
    padding: 16px 0;
`;

const Button1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--White, #FFF);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    background: var(--Gray-400, #AFAFAF);

    align-item: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--Primary, #38E);
    width: 80px;
    height: 40px;
    border-radius: 8px;
    color: var(--White, #FFF);

    align-item: center;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;
