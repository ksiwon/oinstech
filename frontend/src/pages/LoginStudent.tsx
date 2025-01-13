import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginStudent: React.FC = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup/student');
    };

    return (
        <div className="login-container">
            <Header />
            <Wrapper>
                <ContentContainer>
                    <Content>
                        <ContentName>ID</ContentName>
                        <ContentInput>
                            <input type="text" id="student-id" name="student-id" required />
                        </ContentInput>
                    </Content>
                    <Content>
                        <ContentName>PW</ContentName>
                        <ContentInput>
                            <input type="password" id="password" name="password" required />
                        </ContentInput>
                    </Content>
                </ContentContainer>
                <ButtonContainer>
                    <Button1 onClick={handleSignupClick}>회원가입</Button1>
                    <Button2>로그인</Button2>
                </ButtonContainer>
            </Wrapper>
            <Footer />
        </div>
    );
};

export default LoginStudent;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
`

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
`