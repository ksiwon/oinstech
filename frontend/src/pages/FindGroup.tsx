import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchTab from "../components/SearchTab";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import styled from "styled-components";
import axios from "axios";

const FindGroup: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/groups", {
                    params: { page: currentPage, limit: 10 },
                });
                setGroups(response.data.groups);
                setTotalPages(Math.ceil(response.data.total / 10));
            } catch (error) {
                console.error("Failed to fetch groups:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [currentPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <GlobalWrapper>
            <Header />
            <Title text="그룹 찾기" />
            <WholeWrapper>
                <SearchTabWrapper>
                    <SearchTabCover>
                        <SearchTab onSearch={(value) => alert(value)} />
                    </SearchTabCover>
                </SearchTabWrapper>
                <CardWrapper>
                    {groups.map((group) => (
                        <GroupCard
                            id={group.id}
                            teacherId={group.teacherId}
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
                        />
                    ))}
                </CardWrapper>
            </WholeWrapper>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Footer />
        </GlobalWrapper>
    );
};

export default FindGroup;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
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
    margin: 0 auto;
    justify-content: space-evenly;
`;
