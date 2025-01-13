import React from "react";
import { useDispatch } from "react-redux";
import { setStudentData, setTeacherData, clearUserData } from "../redux/slices/userSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Tester: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div>
      {/* Header 컴포넌트 */}
      <Header />

      {/* 테스트 버튼 */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleStudentLogin} style={buttonStyle}>
          학생 로그인
        </button>
        <button onClick={handleTeacherLogin} style={buttonStyle}>
          선생 로그인
        </button>
        <button onClick={handleLogout} style={buttonStyle}>
          로그아웃
        </button>
      </div>
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
