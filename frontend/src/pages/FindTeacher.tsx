import { useState } from "react";
import Header from "../components/Header"
import SearchTab from "../components/SearchTab"
import Title from "../components/Title"
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import StudentCard from "../components/StudentCard";
import styled from "styled-components";

const FindStudent: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태 관리
    const totalPages = 10; // 총 페이지 수 (예시로 10페이지로 설정)
    
    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단으로 스크롤 이동
    };
    
    return (
        <div>
            <Header />
            <Title text="학생 찾기" />
            <WholeWrapper>
                <SearchTabWrapper>
                    <SearchTabCover><SearchTab onSearch={(value) => alert(value)}/></SearchTabCover>
                </SearchTabWrapper>
                <CardWrapper>
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />           
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
                    <StudentCard name={"김철수"} gradeHighschool={"고2"}  neighborhood={"서울시 강남구"} introduction={"안녕하세요. 저는 김철수입니다."} subject={["수학", "물리학", "영어"]} prefered_personality={["친절함", "성실함"]} prefered_tendency={["열정적인", "창의적인"]} />
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
}

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