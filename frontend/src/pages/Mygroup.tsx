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
import SearchTab from "../components/SearchTab";
import GroupCard from "../components/GroupCard";

const apiUrl = process.env.REACT_APP_API_URL;

const Mygroup: React.FC = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedGroup, setSelectedGroup] = useState<any>(null); // 선택한 그룹 상태
    const [showModal, setShowModal] = useState<boolean>(false); // 모달 표시 상태
    const groupsPerPage = 12;
    const [searchTerm, setSearchTerm] = useState<string>("");

    const user = useSelector((state: RootState) => state.user.teacherData);
    const teacherId = user?.id;
    
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchGroups = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/api/groups`, {
                params: {
                    teacherId,
                    page: currentPage,
                    limit: groupsPerPage,
                },
            });
            const filteredGroups = response.data.groups.filter((group: any) => group.teacherId === teacherId);
            setGroups(filteredGroups);
          } catch (error) {
            console.error("Failed to fetch groups:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchGroups();
    }, [currentPage, searchTerm, teacherId]);

    const handleEditGroup = (group: any) => {
        setSelectedGroup(group); // 선택한 그룹 설정
        setShowModal(true); // 모달 표시
    };

    const handleDeleteGroup = async (groupId: string) => {
        if (!window.confirm("이 그룹을 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`${apiUrl}/api/groups/${groupId}`);
            alert("그룹이 성공적으로 삭제되었습니다.");
            setGroups(groups.filter(group => group.id !== groupId));
        } catch (err: any) {
            console.error("Error deleting group:", err);
            alert("그룹 삭제 중 문제가 발생했습니다.");
        }
    };

    const handleSaveGroup = async (updatedGroup: any) => {
        try {
            await axios.put(`${apiUrl}/api/groups/${updatedGroup.id}`, updatedGroup);
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
                    <Button2 onClick={() => navigate("/mygroup/create")}>그룹 생성</Button2>
                </ContentWrapper>
                현재 생성된 그룹이 없습니다.
                <Footer />
            </GlobalWrapper>
        );
    }

    return (
        <GlobalWrapper>
            <Header />
            <Title text="My Group" />
            <WholeWrapper>
                <SearchTabWrapper>
                    <SearchTabCover>
                        <SearchTab onSearch={handleSearch} />
                    </SearchTabCover>
                </SearchTabWrapper>
                <Button2 onClick={() => navigate("/mygroup/create")}>그룹 생성</Button2>
                <CardWrapper>
                {groups.length > 0 ? (
                    groups.map((group) => (
                    <GroupCard
                        key={group.id}
                        id={group.id}
                        name={group.name}
                        university={group.university}
                        major={group.major}
                        gradeUniversity={group.gradeUniversity}
                        introduction={group.introduction}
                        subject={group.subject}
                        personality={group.personality}
                        tendency={group.tendency}
                        address={group.address}
                        personnel={group.personnel}
                        currentPersonnel={group.currentPersonnel}
                        score={group.score || 0}
                        gender={group.gender}
                        onClick={() => handleEditGroup(group)}
                    />
                    ))
                ) : (
                    <div>검색 결과가 없습니다.</div>
                )}
                </CardWrapper>
            </WholeWrapper>
            {showModal && selectedGroup && (
                <EditModal
                    group={selectedGroup}
                    onSave={handleSaveGroup}
                    onClose={() => setShowModal(false)}
                    onClick={() => handleDeleteGroup(selectedGroup.id)}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(groups.length / groupsPerPage)}
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

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const SearchTabWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  padding: 32px 0;
  align-self: center;
`;

const SearchTabCover = styled.div`
  width: 80%;
`;

const CardWrapper = styled.div`
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