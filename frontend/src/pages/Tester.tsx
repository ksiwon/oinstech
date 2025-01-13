import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setStudentData, setTeacherData, clearUserData } from "../redux/slices/userSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Title from "../components/Title";
import RadioButtonWrapper from "../components/RadioButton";
import CheckBoxWrapper from "../components/CheckBox";
import SubjectSmall from "../components/SubjectSmall";
import SubjectBig from "../components/SubjectBig";
import axios from "axios";

const Tester: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentData = {
    id: "student1",
    password: "password123",
    name: "홍길동",
    gender: "남성",
    birth: "2000-01-01",
    phone: "010-1234-5678",
    address: "서울시 강남구",
    school: "일반고",
    gradeHighschool: ["고1"],
    otherGradeHighschool: undefined,
    subject: ["수학", "영어"],
    tendency: ["내신 집중", "문제 풀이 중심"],
    location: "강사 → 학생",
    face: "대면",
    payWant: "~4만원",
    introduction: "열심히 하겠습니다!",
    detail: "수학과 영어를 배우고 싶습니다.",
  };

  const teacherData = {
    id: "teacher1",
    password: "password123",
    name: "김선생",
    gender: "여성",
    birth: "1985-05-15",
    phone: "010-5678-1234",
    address: "서울시 종로구",
    university: "서울대학교",
    otherUniversity: undefined,
    major: "수학과",
    gradeUniversity: 4,
    personality: ["책임감 강함", "친근함"],
    subject: ["수학", "물리학"],
    tendency: ["수능 집중", "복습과 반복 강조"],
    location: "상관없음",
    face: "비대면",
    pay: 50000,
    introduction: "수학의 재미를 알려드립니다.",
    detail: "10년 경력의 강사입니다.",
  };

  // 학생 로그인 핸들러
  const handleStudentLogin = () => {
    dispatch(
      setStudentData({
        id: "student1",
        password: "password123",
        name: "홍길동",
        gender: "남성",
        birth: "2000-01-01",
        phone: "010-1234-5678",
        address: "서울시 강남구",
        school: "일반고",
        gradeHighschool: ["고1"],
        otherGradeHighschool: undefined,
        subject: ["수학", "영어"],
        tendency: ["내신 집중", "문제 풀이 중심"],
        location: "강사 → 학생",
        face: "대면",
        payWant: "~4만원",
        introduction: "열심히 하겠습니다!",
        detail: "수학과 영어를 배우고 싶습니다.",
      })
    );
    navigate("/");
  };

  // 선생 로그인 핸들러
  const handleTeacherLogin = () => {
    dispatch(
      setTeacherData({
        id: "teacher1",
        password: "password123",
        name: "김선생",
        gender: "여성",
        birth: "1985-05-15",
        phone: "010-5678-1234",
        address: "서울시 종로구",
        university: "서울대학교",
        otherUniversity: undefined,
        major: "수학과",
        gradeUniversity: 4,
        personality: ["책임감 강함", "친근함"],
        subject: ["수학", "물리학"],
        tendency: ["수능 집중", "복습과 반복 강조"],
        location: "상관없음",
        face: "비대면",
        pay: 50000,
        introduction: "수학의 재미를 알려드립니다.",
        detail: "10년 경력의 강사입니다.",
      })
    );
    navigate("/");
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    dispatch(clearUserData());
    navigate("/");
  };

  const handleStudentPost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/students", studentData);
      console.log("Student created:", response.data);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const handleTeacherPost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/teachers", teacherData);
      console.log("Teacher created:", response.data);
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태 관리
  const totalPages = 10; // 총 페이지 수 (예시로 10페이지로 설정)

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단으로 스크롤 이동
  };
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (index: number | null) => {
    setSelectedOption(index); // 선택된 옵션의 인덱스 업데이트
  };

  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // 선택된 체크박스 인덱스를 관리하는 상태

  const handleSelectionChange = (selected: number[]) => {
    setSelectedIndices(selected); // 선택된 체크박스 인덱스 업데이트트
  };

  const subjects = ["국어", "영어", "수학", "물리", "화학", "생물", "지학", "정보"];

  return (
    <div>
      {/* Header 컴포넌트 */}
      <Header />
      <Title text="Tester Page" />

      {/* 테스트 버튼 */}
      <div style={{ textAlign: "center" }}>
        <button onClick={() => { handleStudentLogin(); handleStudentPost(); }} style={buttonStyle}>
          학생 로그인
        </button>
        <button onClick={() => { handleTeacherLogin(); handleTeacherPost(); }} style={buttonStyle}>
          선생 로그인
        </button>
        <button onClick={handleLogout} style={buttonStyle}>
          로그아웃
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <RadioButtonWrapper
        options={["Option 1", "Option 2", "Option 3"]}
        onSelect={handleSelect}
      />
      <CheckBoxWrapper
        options={["옵션 1", "옵션 2", "옵션 3"]}
        selectedIndices={selectedIndices} // 선택 상태 전달
        onSelectionChange={handleSelectionChange} // 선택 변경 이벤트 전달
      />
      <SubjectSmall subjects={subjects} />
      <SubjectBig subjects={subjects} />
      <Footer />
    </div>
  );
};

// 버튼 스타일
const buttonStyle: React.CSSProperties = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Tester;
