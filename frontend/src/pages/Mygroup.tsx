import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import styled from "styled-components";
import Title from "../components/Title";
import axios from "axios";
import EditModal from "../components/EditModal"; // 모달 컴포넌트 추가

const Mygroup: React.FC = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalGroups, setTotalGroups] = useState<number>(0);
    const [selectedGroup, setSelectedGroup] = useState<any>(null); // 선택한 그룹 상태
    const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태
    const groupsPerPage = 10;

    const user = useSelector((state: RootState) => state.user.teacherData);
    const teacherId = user?.id;

    useEffect(() => {
        const fetchGroups = async () => {
            if (!teacherId) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                navigate("/");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/groups`, {
                    params: {
                        teacherId,
                        page: currentPage,
                        limit: groupsPerPage,
                    },
                });

                setGroups(response.data.groups);
                setTotalGroups(response.data.total);
            } catch (err: any) {
                console.error("Error fetching groups:", err);
                alert("그룹 정보를 가져오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [teacherId, currentPage, navigate]);

    const handleEditGroup = (group: any) => {
        setSelectedGroup(group); // 선택한 그룹 설정
        setShowModal(true); // 모달 표시
    };

    const handleDeleteGroup = async (groupId: string) => {
        if (!window.confirm("이 그룹을 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/groups/${groupId}`);
            alert("그룹이 성공적으로 삭제되었습니다.");
            setGroups(groups.filter(group => group.id !== groupId));
            setTotalGroups(totalGroups - 1);
        } catch (err: any) {
            console.error("Error deleting group:", err);
            alert("그룹 삭제 중 문제가 발생했습니다.");
        }
    };

    const handleSaveGroup = async (updatedGroup: any) => {
        try {
            await axios.put(`http://localhost:5000/api/groups/${updatedGroup.id}`, updatedGroup);
            alert("그룹이 성공적으로 수정되었습니다.");
            setGroups(groups.map(group => (group.id === updatedGroup.id ? updatedGroup : group)));
            setShowModal(false); // 모달 닫기
        } catch (err: any) {
            console.error("Error updating group:", err);
            alert("그룹 수정 중 문제가 발생했습니다.");
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <GlobalWrapper>Loading...</GlobalWrapper>;
    }

    if (!groups.length) {
        return (
            <GlobalWrapper>
                <Header />
                <Title text="My Group" />
                <ContentWrapper>
                    <p>현재 생성된 그룹이 없습니다.</p>
                    <Button onClick={() => navigate("/mygroup/create")}>그룹 생성</Button>
                </ContentWrapper>
                <Footer />
            </GlobalWrapper>
        );
    }

    return (
        <GlobalWrapper>
            <Header />
            <Title text="My Group" />
            <WholeWrapper>
                <Button2 onClick={() => navigate("/mygroup/create")}>그룹 생성</Button2>
                <ContentWrapper>
                    <GroupList>
                        {groups.map(group => (
                            <GroupCard key={group.id}>
                                <GroupInfo>
                                    <GroupName>{group.name}</GroupName>
                                    <GroupDetail>과목: {group.subject}</GroupDetail>
                                    <GroupDetail>수업료: {group.pay.toLocaleString()}원/시간</GroupDetail>
                                    <GroupDetail>모집 인원: {group.currentPersonnel} / {group.personnel}</GroupDetail>
                                    <GroupDetail>소개: {group.introduction}</GroupDetail>
                                </GroupInfo>
                                <ButtonContainer>
                                    <Button onClick={() => handleEditGroup(group)}>수정</Button>
                                    <Button bgcolor="#FA5858" onClick={() => handleDeleteGroup(group.id)}>삭제</Button>
                                </ButtonContainer>
                            </GroupCard>
                        ))}
                    </GroupList>
                </ContentWrapper>
            </WholeWrapper>
            {showModal && selectedGroup && (
                <EditModal
                    group={selectedGroup}
                    onSave={handleSaveGroup}
                    onClose={() => setShowModal(false)}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalGroups / groupsPerPage)}
                onPageChange={handlePageChange}
            />
            <Footer />
        </GlobalWrapper>
    );
};

export default Mygroup;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 90%;
    padding: 32px 0;
    align-items: center;
    justify-content: center;
    gap: 32px;
    align-self: stretch;
    flex-wrap: wrap;
    margin: 0 auto; /* 가운데 정렬 */
    justify-content: space-evenly; /* 카드 간 간격 균등 */
`;

const GroupList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const GroupCard = styled.div`
    width: 300px;
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.blue[100]};
`;

const GroupInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 8px;
    overflow: hidden;
`;

const GroupName = styled.h3`
    font-family: pretendard;
    margin: 4px 0 8px;
    font-size: 24px;
`;

const GroupDetail = styled.p`
    font-family: pretendard;
    margin: 4px 0;
    width: 100%;
    text-align: left;
    font-size: 18px;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button<{ bgcolor?: string }>`
    font-family: pretendard;
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    background-color: ${({ bgcolor, theme }: { bgcolor?: string; theme: any }) => bgcolor || theme.colors.primary};
    &:hover {
        opacity: 0.5;
    }
`;

const WholeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--Primary, #38E);
    border-radius: 8px;
    color: var(--White, #FFF);
    padding: 8px 16px;
    margin: 32px 0 0 0;

    align-item: center;
    font-family: ${({ theme }) => theme.typography.T3.fontFamily};
    font-size: ${({ theme }) => theme.typography.T3.fontSize};
    font-weight: ${({ theme }) => theme.typography.T3.fontWeight};
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
`;