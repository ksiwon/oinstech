import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchTab from "../components/SearchTab";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import TeacherCard from "../components/TeacherCard";
import styled from "styled-components";
import axios from "axios";

const FindStudent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/teachers/list", {
                    params: { page: currentPage, limit: 10 },
                });
                setTeachers(response.data.teachers);
                setTotalPages(Math.ceil(response.data.total / 10));
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, [currentPage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Title text="강사 찾기" />
            <WholeWrapper>
                <SearchTabWrapper>
                    <SearchTabCover>
                        <SearchTab onSearch={(value) => alert(value)} />
                    </SearchTabCover>
                </SearchTabWrapper>
                <CardWrapper>
                    {teachers.map((teacher) => (
                        <TeacherCard
                            id={teacher.id}
                            name={teacher.name}
                            university={teacher.university}
                            major={teacher.major}
                            gradeUniversity={teacher.gradeUniversity}
                            neighborhood={teacher.neighborhood}
                            introduction={teacher.introduction}
                            subject={teacher.subject}
                            personality={teacher.personality}
                            tendency={teacher.tendency}
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
        </div>
    );
};

export default FindStudent;

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
