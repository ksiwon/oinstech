import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchTab from "../components/SearchTab";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import TeacherCard from "../components/TeacherCard";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const FindStudent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  // 검색어 상태 추가
  const [searchTerm, setSearchTerm] = useState<string>("");

  const user = useSelector((state: RootState) => state.user.studentData);
  const studentId = user?.id;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // onSearch 콜백 구현: searchTerm 업데이트 및 페이지 초기화
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        let response;
        if (studentId) {
          response = await axios.get(`http://localhost:5000/api/match-teachers/${studentId}`, {
            params: { page: currentPage, limit: 10, search: searchTerm },
          });
        } else {
          response = await axios.get("http://localhost:5000/api/teachers/list", {
            params: { page: currentPage, limit: 10, search: searchTerm },
          });
        }
        setTeachers(response.data.teachers);
        setTotalPages(Math.ceil(response.data.total / 10));
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [studentId, currentPage, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalWrapper>
      <Header />
      <Title text="강사 찾기" />
      <WholeWrapper>
        <SearchTabWrapper>
          <SearchTabCover>
            <SearchTab onSearch={handleSearch} />
          </SearchTabCover>
        </SearchTabWrapper>
        <CardWrapper>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
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
                score={teacher.score || 0}
              />
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
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

export default FindStudent;

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
    margin: 0 auto; /* 가운데 정렬 */
    justify-content: space-evenly; /* 카드 간 간격 균등 */
`;
