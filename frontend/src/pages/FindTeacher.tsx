import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchTab from "../components/SearchTab";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import StudentCard from "../components/StudentCard";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const FindTeacher: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const teacher = useSelector((state: RootState) => state.user.teacherData);
  const teacherId = teacher?.id;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        let response;
        if (teacherId) {
          response = await axios.get(`http://localhost:5000/api/match-students/${teacherId}`, {
            params: { page: currentPage, limit: 12, search: searchTerm },
          });
        } else {
          response = await axios.get("http://localhost:5000/api/students/list", {
            params: { page: currentPage, limit: 12, search: searchTerm },
          });
        }
        setStudents(response.data.students);
        setTotalPages(Math.ceil(response.data.total / 12));
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherId, currentPage, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalWrapper>
      <Header />
      <Title text="학생 찾기" />
      <WholeWrapper>
        <SearchTabWrapper>
          <SearchTabCover>
            <SearchTab onSearch={handleSearch} />
          </SearchTabCover>
        </SearchTabWrapper>
        <CardWrapper>
          {students.length > 0 ? (
            students.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                gradeHighschool={student.gradeHighschool}
                neighborhood={student.neighborhood}
                introduction={student.introduction}
                subject={student.subject}
                prefered_personality={student.prefered_personality}
                prefered_tendency={student.prefered_tendency}
                score={student.score || 0}
                gender={student.gender}
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

export default FindTeacher;

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