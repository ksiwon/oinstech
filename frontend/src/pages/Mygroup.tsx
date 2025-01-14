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

const Mygroup: React.FC = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<any[]>([]); // 그룹 데이터를 저장
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalGroups, setTotalGroups] = useState<number>(0); // 전체 그룹 수
    const groupsPerPage = 10; // 한 페이지에 보여줄 그룹 수

    // Redux에서 현재 로그인 중인 유저 데이터 가져오기
    const user = useSelector((state: RootState) => state.user.teacherData);
    const teacherId = user?.id;

    useEffect(() => {
        const fetchGroups = async () => {
            if (!teacherId) {
                alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
                navigate("/login");
                return;
            }

            try {
                // teacherId가 userId와 같은 그룹만 가져옴
                const response = await axios.get(`http://localhost:5000/api/groups`, {
                    params: {
                        teacherId, // Redux에서 가져온 teacherId를 사용
                        page: currentPage,
                        limit: groupsPerPage,
                    },
                });

                setGroups(response.data.groups); // 데이터 상태에 저장
                setTotalGroups(response.data.total); // 전체 그룹 수 저장
            } catch (err: any) {
                console.error("Error fetching groups:", err);
                alert("그룹 정보를 가져오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchGroups();
    }, [teacherId, currentPage, navigate]);

    const handleEditGroup = (groupId: string) => {
        navigate(`/edit-group/${groupId}`); // 그룹 수정 페이지로 이동
    };

    const handleDeleteGroup = async (groupId: string) => {
        if (!window.confirm("이 그룹을 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/groups/${groupId}`);
            alert("그룹이 성공적으로 삭제되었습니다.");
            setGroups(groups.filter(group => group.id !== groupId));
            setTotalGroups(totalGroups - 1); // 그룹 수 감소
        } catch (err: any) {
            console.error("Error deleting group:", err);
            alert("그룹 삭제 중 문제가 발생했습니다.");
        }
    };

    const handleCreateGroup = () => {
        navigate("/create-group"); // 그룹 생성 페이지로 이동
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // 페이지 변경
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!groups.length) {
        return (
            <div>
                <Header />
                <Title text="내가 만든 그룹" />
                <ContentWrapper>
                    <p>현재 생성된 그룹이 없습니다.</p>
                    <Button onClick={handleCreateGroup}>그룹 생성</Button>
                </ContentWrapper>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Title text="내가 만든 그룹" />
            <ContentWrapper>
                <Button onClick={handleCreateGroup}>그룹 생성</Button>
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
                                <Button onClick={() => handleEditGroup(group.id)}>수정</Button>
                                <Button onClick={() => handleDeleteGroup(group.id)}>삭제</Button>
                            </ButtonContainer>
                        </GroupCard>
                    ))}
                </GroupList>
            </ContentWrapper>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalGroups / groupsPerPage)}
                onPageChange={handlePageChange}
            />
            <Footer />
        </div>
    );
};

export default Mygroup;

const ContentWrapper = styled.div`
    padding: 20px;
`;

const GroupList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const GroupCard = styled.div`
    width: 300px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

const GroupInfo = styled.div`
    margin-bottom: 16px;
`;

const GroupName = styled.h3`
    margin: 0;
    font-size: 18px;
`;

const GroupDetail = styled.p`
    margin: 4px 0;
    font-size: 14px;
    color: #555;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
