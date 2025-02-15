import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchTab from "../components/SearchTab";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupCard";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const FindGroup: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Redux에서 학생 데이터를 가져온다고 가정
  const student = useSelector((state: RootState) => state.user.studentData);
  const studentId = student?.id;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        let response;
        if (studentId) {
          response = await axios.get(`http://localhost:5000/api/match-groups/${studentId}`, {
            params: { page: currentPage, limit: 12, search: searchTerm },
          });
        } else {
          response = await axios.get("http://localhost:5000/api/groups", {
            params: { page: currentPage, limit: 12, search: searchTerm },
          });
        }
        setGroups(response.data.groups);
        setTotalPages(Math.ceil(response.data.total / 12));
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [studentId, currentPage, searchTerm]);

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
            <SearchTab onSearch={handleSearch} />
          </SearchTabCover>
        </SearchTabWrapper>
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
    margin: 0 auto; /* 가운데 정렬 */
    justify-content: space-evenly; /* 카드 간 간격 균등 */
`;