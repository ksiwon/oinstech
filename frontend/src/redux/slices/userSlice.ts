// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentData {
  id: string;
  password: string;
  name: string;
  gender: "남성" | "여성";
  birth: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  school: "일반고" | "과학고/영재고" | "자율고" | "외고" | "국제고" | "해당없음";
  gradeHighschool: (
    | "초등학생"
    | "중1"
    | "중2"
    | "중3"
    | "고1"
    | "고2"
    | "고3"
    | "재수생"
    | "대학생"
    | "기타"
  )[];
  otherGradeHighschool?: string;
  subject: (
    | "국어"
    | "수학"
    | "영어"
    | "물리학"
    | "화학"
    | "생명과학"
    | "지구과학"
    | "정보/코딩"
  )[];
  prefered_tendency: (
    | "기본 개념부터 차근차근"
    | "문제 풀이 중심"
    | "내신 집중"
    | "수능 집중"
    | "단기간 집중 학습"
    | "선행 위주 수업"
    | "창의력 강화"
    | "복습과 반복 강조"
    | "약점 집중 보완"
  )[];
  location: "강사 → 학생" | "학생 → 강사";
  face: "대면" | "비대면";
  payWant: "상관없음" | "~3만원" | "~4만원" | "~5만원";
  introduction: string;
  detail: string;
  prefered_gender: ("남성" | "여성")[];
  prefered_school: string[];
  prefered_personality?: (
    | "열정적임"
    | "친근함"
    | "다정함"
    | "유머러스함"
    | "이해심 많음"
    | "꼼꼼함"
    | "책임감 강함"
    | "차분함"
    | "창의적임"
  )[];
}

interface TeacherData {
  id: string;
  password: string;
  name: string;
  gender: "남성" | "여성";
  birth: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  university:
    | "서울대학교"
    | "연세대학교"
    | "고려대학교"
    | "KAIST"
    | "POSTECH"
    | "UNIST"
    | "DGIST"
    | "GIST"
    | "성균관대학교"
    | "한양대학교"
    | "서강대학교"
    | "중앙대학교"
    | "경희대학교"
    | "한국외국어대학교"
    | "서울시립대학교"
    | "건국대학교"
    | "동국대학교"
    | "부산대학교"
    | "이화여자대학교"
    | "숙명여자대학교"
    | "기타";
  otherUniversity?: string;
  major: string;
  gradeUniversity: number;
  personality: (
    | "열정적임"
    | "친근함"
    | "다정함"
    | "유머러스함"
    | "이해심 많음"
    | "꼼꼼함"
    | "책임감 강함"
    | "차분함"
    | "창의적임"
  )[];
  subject: (
    | "국어"
    | "수학"
    | "영어"
    | "물리학"
    | "화학"
    | "생명과학"
    | "지구과학"
    | "정보/코딩"
  )[];
  tendency: (
    | "기본 개념부터 차근차근"
    | "문제 풀이 중심"
    | "내신 집중"
    | "수능 집중"
    | "단기간 집중 학습"
    | "선행 위주 수업"
    | "창의력 강화"
    | "복습과 반복 강조"
    | "약점 집중 보완"
  )[];
  location: "강사 → 학생" | "학생 → 강사";
  face: "대면" | "비대면";
  pay: number;
  introduction: string;
  detail: string;
  prefered_gender: "남성" | "여성";
  prefered_personality?: (
    | "열정적임"
    | "친근함"
    | "다정함"
    | "유머러스함"
    | "이해심 많음"
    | "꼼꼼함"
    | "책임감 강함"
    | "차분함"
    | "창의적임"
  )[];
  prefered_gradeHighschool?: (
    | "초등학생"
    | "중1"
    | "중2"
    | "중3"
    | "고1"
    | "고2"
    | "고3"
    | "재수생"
    | "대학생"
    | "기타"
  )[];
}

interface UserState {
  role: "student" | "teacher" | null;
  studentData?: StudentData;
  teacherData?: TeacherData;
}

const initialState: UserState = {
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStudentData: (state, action: PayloadAction<StudentData>) => {
      state.role = "student";
      state.studentData = action.payload;
    },
    setTeacherData: (state, action: PayloadAction<TeacherData>) => {
      state.role = "teacher";
      state.teacherData = action.payload;
    },
    clearUserData: (state) => {
      state.role = null;
      state.studentData = undefined;
      state.teacherData = undefined;
    },
  },
});

export const { setStudentData, setTeacherData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
