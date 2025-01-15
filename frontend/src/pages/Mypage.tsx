import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import boy from '../assets/boy.png';
import girl from '../assets/girl.png';
import SubjectBig from '../components/SubjectBig';
import Title from '../components/Title';

function getAge(birth: string): number{
    const today = new Date();
    const birthDate = new Date(birth);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

const Mypage: React.FC = () => {
    const { role, studentData, teacherData } = useSelector((state: RootState) => state.user);
    const user = (role === "student") ? studentData : teacherData;

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <GlobalWrapper>
            <Header />
            {user.role === 'student' ? (
                <div>
                    <Title text="My Page" />
                    <WholeFrame>
                        <TopFrame>
                            <ImageFrame imageUrl={(user.gender === '남성') ? boy : girl } />
                            <ContentWrapper>
                                <ContentFrame>
                                    <Content>
                                        <ContentName>이름</ContentName>
                                        <ContentInput>{user.name}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>성별</ContentName>
                                        <ContentInput>{user.gender}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>나이</ContentName>
                                        <ContentInput>만 {getAge(user.birth)}세</ContentInput>
                                    </Content>
                                </ContentFrame>
                                <ContentFrame>
                                    <Content>
                                        <ContentName>학년</ContentName>
                                        <ContentInput>{user.gradeHighschool} ({user.school})</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>대면 여부</ContentName>
                                        <ContentInput>
                                            {Array.isArray(user.face) 
                                            ? user.face.join(', ') 
                                            : user.face}
                                        </ContentInput>
                                    </Content>
                                </ContentFrame>
                                <ContentFrame>
                                    <Content>
                                        <ContentName>지역</ContentName>
                                        <ContentInput>{user.city} {user.district} {user.neighborhood}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>수업 장소</ContentName>
                                        <ContentInput>
                                            {Array.isArray(user.location) 
                                            ? user.location.join(', ') 
                                            : user.location}
                                        </ContentInput>
                                    </Content>
                                </ContentFrame>
                                <Content>
                                    <ContentName>과목</ContentName>
                                    <ContentInput>
                                        <SubjectBig subjects={user.subject.map((subject) => {
                                            switch (subject) {
                                                case "국어":
                                                    return "국어";
                                                case "영어":
                                                    return "영어";
                                                case "수학":
                                                    return "수학";
                                                case "물리학":
                                                    return "물리";
                                                case "화학":
                                                    return "화학";
                                                case "생명과학":
                                                    return "생물";
                                                case "지구과학":
                                                    return "지학";
                                                case "정보/코딩":
                                                    return "정보";
                                                default:
                                                    return subject;
                                            }
                                        })} />
                                    </ContentInput>
                                </Content>
                            </ContentWrapper>
                        </TopFrame>
                        <BottomFrame>
                            <ContentFrame>
                                <ContentTemp>
                                    <ContentName>선호 성별</ContentName>
                                    <ContentInput>{user.prefered_gender.join(', ')}</ContentInput>
                                </ContentTemp>
                                <Content>
                                    <ContentName>선호 성격</ContentName>
                                    <ContentInput>
                                        {Array.isArray(user.prefered_personality) 
                                        ? user.prefered_personality.join(', ') 
                                        : user.prefered_personality}
                                    </ContentInput>
                                </Content>
                                <Content>
                                    <ContentName>선호 성향</ContentName>
                                    <ContentInput>
                                        {Array.isArray(user.prefered_tendency) 
                                        ? user.prefered_tendency.join(', ') 
                                        : user.prefered_tendency}
                                    </ContentInput>
                                </Content>
                            </ContentFrame>
                            <Content>
                                <ContentName>선호 대학</ContentName>
                                <ContentInput>{user.prefered_school.join(', ')}</ContentInput>
                            </Content>
                            <Content>
                                <ContentName>희망 금액</ContentName>
                                <ContentInput>{user.payWant} (시간 당)</ContentInput>
                            </Content>
                            <Content style={{ height: '150px' }}>
                                <ContentName>소개</ContentName>
                                <ContentInput>{user.introduction}</ContentInput>
                            </Content>
                            <Content style={{ height: '300px' }}>
                                <ContentName>상세 내용</ContentName>
                                <ContentInput>{user.detail}</ContentInput>
                            </Content>
                        </BottomFrame>
                    </WholeFrame>
                </div>
            ) : user.role === 'teacher' ? (
                <div>
                    <Title text="My Page" />
                    <WholeFrame>
                        <TopFrame>
                            <ImageFrame imageUrl={(user.gender === '남성') ? boy : girl } />
                            <ContentWrapper>
                                <ContentFrame>
                                    <Content>
                                        <ContentName>이름</ContentName>
                                        <ContentInput>{user.name}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>성별</ContentName>
                                        <ContentInput>{user.gender}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>나이</ContentName>
                                        <ContentInput>만 {getAge(user.birth)}세</ContentInput>
                                    </Content>
                                </ContentFrame>
                                <ContentFrame>
                                    <Content>
                                        <ContentName>학교</ContentName>
                                        <ContentInput>{user.university} {user.major} {user.gradeUniversity}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>대면 여부</ContentName>
                                        <ContentInput>
                                            {Array.isArray(user.face) 
                                            ? user.face.join(', ') 
                                            : user.face}
                                        </ContentInput>
                                    </Content>
                                </ContentFrame>
                                <ContentFrame>
                                    <Content>
                                        <ContentName>지역</ContentName>
                                        <ContentInput>{user.city} {user.district} {user.neighborhood}</ContentInput>
                                    </Content>
                                    <Content>
                                        <ContentName>수업 장소</ContentName>
                                        <ContentInput>
                                            {Array.isArray(user.location) 
                                            ? user.location.join(', ') 
                                            : user.location}
                                        </ContentInput>
                                    </Content>
                                </ContentFrame>
                                <Content>
                                    <ContentName>과목</ContentName>
                                    <ContentInput>
                                        <SubjectBig subjects={user.subject.map((subject) => {
                                            switch (subject) {
                                                case "국어":
                                                    return "국어";
                                                case "영어":
                                                    return "영어";
                                                case "수학":
                                                    return "수학";
                                                case "물리학":
                                                    return "물리";
                                                case "화학":
                                                    return "화학";
                                                case "생명과학":
                                                    return "생물";
                                                case "지구과학":
                                                    return "지학";
                                                case "정보/코딩":
                                                    return "정보";
                                                default:
                                                    return subject;
                                            }
                                        })} />
                                    </ContentInput>
                                </Content>
                            </ContentWrapper>
                        </TopFrame>
                        <BottomFrame>
                            <ContentFrame>
                                <ContentTemp>
                                    <ContentName>선호 성별</ContentName>
                                    <ContentInput>{user.prefered_gender.join(', ')}</ContentInput>
                                </ContentTemp>
                                <Content>
                                    <ContentName>강사 성격</ContentName>
                                    <ContentInput>
                                        {Array.isArray(user.personality) 
                                        ? user.personality.join(', ') 
                                        : user.personality}
                                    </ContentInput>
                                </Content>
                                <Content>
                                    <ContentName>수업 성향</ContentName>
                                    <ContentInput>
                                        {Array.isArray(user.tendency) 
                                        ? user.tendency.join(', ') 
                                        : user.tendency}
                                    </ContentInput>
                                </Content>
                            </ContentFrame>
                            <ContentFrame>
                                <Content>
                                    <ContentName>선호 학년</ContentName>
                                    <ContentInput>{user.prefered_gradeHighschool ? user.prefered_gradeHighschool.join(', ') : 'N/A'}</ContentInput>
                                </Content>
                                <Content>
                                    <ContentName>선호 고교</ContentName>
                                    <ContentInput>{user.prefered_school.join(', ')}</ContentInput>
                                </Content>
                            </ContentFrame>
                            <Content>
                                <ContentName>금액</ContentName>
                                <ContentInput>{user.pay.toLocaleString('ko-KR')}원 (시간 당)</ContentInput>
                            </Content>
                            <Content style={{ height: '150px' }}>
                                <ContentName>소개</ContentName>
                                <ContentInput>{user.introduction}</ContentInput>
                            </Content>
                            <Content style={{ height: '300px' }}>
                                <ContentName>상세 내용</ContentName>
                                <ContentInput>{user.detail}</ContentInput>
                            </Content>
                        </BottomFrame>
                    </WholeFrame>
                </div>
            ) : null}
            <Footer />
        </GlobalWrapper>
    );
};

export default Mypage;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const ImageFrame = styled.div<{ imageUrl: string }>`
    width: 328px;
    height: 328px;
    flex-shrink: 0;
    border-radius: 32px;
    border: 4px solid ${({ theme }) => theme.colors.primary};
    background: url(${({ imageUrl }) => imageUrl}) transparent -23.226px -23.226px / 116.129% 116.129% no-repeat;
`;

const ContentName = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 140px;
    height: 100%;
    font-size: ${({ theme }) => theme.typography.T4.fontSize};
    font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    justify-content: center;
    border-radius: 8px 0px 0px 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const ContentInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: left;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.T5.fontSize};
    font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 0px 8px 8px 0px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding: 0 16px;
`;

const Content = styled.div<{ height?: string, width?: string }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 336px;
    height: 70px;
    align-items: center;
    border-radius: 8px;
`;

const ContentTemp = styled.div`
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    width: 336px;
    height: 70px;
    align-items: center;
    border-radius: 8px;
`;

const ContentFrame = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
    gap: 16px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
`;

const TopFrame = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
`;

const BottomFrame = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin: 0 auto;
`;

const WholeFrame = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 0;
`;