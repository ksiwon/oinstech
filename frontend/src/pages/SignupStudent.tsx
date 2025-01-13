import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import RadioButtonWrapper from "../components/RadioButton";
import CheckBoxWrapper from "../components/CheckBox";
import { useTheme } from "styled-components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import regionHierarchy from "../assets/region_hierarchy.json";

// 지역 데이터 타입 정의
type RegionsType = {
    [city: string]: {
      [district: string]: string[];
    };
  };

const SignupStudent: React.FC = () => {
  const theme = useTheme();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    birth: new Date(),
    city: "", // 추가된 속성
    district: "", // 추가된 속성
    neighborhood: "", // 추가된 속성
    location: "",
    gender: "",
    school: "",
    gradeHighschool: [] as string[],
    subject: [] as string[],
    tendency: [] as string[],
    face: "",
    payWant: "",
    introduction: "",
    detail: "",
  });

  const regions: RegionsType = regionHierarchy;

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState<string[]>([]);

  // 생년월일 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    if (date) setFormData({ ...formData, birth: date });
  };

  // 시/구/동 선택 핸들러
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setFormData({ ...formData, city, district: "", neighborhood: "" });
    setAvailableDistricts(city ? Object.keys(regions[city]) : []);
    setAvailableNeighborhoods([]);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setFormData({ ...formData, district, neighborhood: "" });
    setAvailableNeighborhoods(district ? regions[formData.city][district] : []);
  };

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, neighborhood: e.target.value });
  };

  // Mapping options to indices for CheckBoxWrapper and RadioButtonWrapper
  const optionsMap: Record<
    "gender" | "school" | "gradeHighschool" | "subject" | "tendency" | "face" | "payWant",
    string[]
    > = {
    gender: ["남성", "여성"],
    school: ["해당 없음", "일반고", "과학고/영재고", "자율고", "외고", "국제고"],
    gradeHighschool: ["초등학생", "중1", "중2", "중3", "고1", "고2", "고3", "재수생", "기타"],
    subject: ["국어", "수학", "영어", "물리학", "화학", "생명과학", "지구과학", "정보/코딩"],
    tendency: [
        "기본 개념부터 차근차근",
        "문제 풀이 중심",
        "내신 집중",
        "수능 집중",
        "단기간 집중 학습",
        "선행 위주 수업",
        "창의력 강화",
        "복습과 반복 강조",
        "약점 집중 보완",
    ],
    face: ["대면", "비대면"],
    payWant: ["상관 없음", "~3만원", "~4만원", "~5만원"],
    };

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle RadioButton selection
  const handleRadioSelect = (
    key: keyof typeof optionsMap,
    selectedIndex: number | null
  ) => {
    if (selectedIndex !== null) {
      const selectedValue = optionsMap[key][selectedIndex];
      setFormData({ ...formData, [key]: selectedValue });
    }
  };

  // Handle CheckBox selection
  const handleCheckboxSelect = (
    key: keyof typeof optionsMap,
    selectedIndices: number[]
  ) => {
    const selectedValues = selectedIndices.map((index) => optionsMap[key][index]);
    setFormData({ ...formData, [key]: selectedValues });
  };

  // Submit the form
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/students", { ...formData, role: "student" });
      console.log("Student created:", response.data);
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ backgroundColor: theme.colors.gray[100] }}>
        <Title text="회원가입" />
        {/* 이름 */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ display: "block", fontSize: theme.typography.T6.fontSize }}>이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* 생년월일 */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ display: "block", fontSize: theme.typography.T6.fontSize }}>생년월일</label>
          <DatePicker
            selected={formData.birth}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            showYearDropdown // 연도 드롭다운 활성화
            showMonthDropdown // 월 드롭다운 활성화
            dropdownMode="select" // 드롭다운 모드 (드롭다운 선택 방식)
            className="custom-datepicker"
          />
        </div>

        {/* 지역 */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ display: "block", fontSize: theme.typography.T6.fontSize }}>지역</label>
          <select
            value={formData.city}
            onChange={handleCityChange}
            style={{
              width: "30%",
              padding: "10px",
              fontSize: theme.typography.T7.fontSize,
              marginRight: "10px",
            }}
          >
            <option value="">시 선택</option>
            {Object.keys(regions).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={formData.district}
            onChange={handleDistrictChange}
            style={{
              width: "30%",
              padding: "10px",
              fontSize: theme.typography.T7.fontSize,
              marginRight: "10px",
            }}
          >
            <option value="">구 선택</option>
            {availableDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <select
            value={formData.neighborhood}
            onChange={handleNeighborhoodChange}
            style={{
              width: "30%",
              padding: "10px",
              fontSize: theme.typography.T7.fontSize,
            }}
          >
            <option value="">동 선택</option>
            {availableNeighborhoods.map((neighborhood) => (
              <option key={neighborhood} value={neighborhood}>
                {neighborhood}
              </option>
            ))}
          </select>
        </div>


        {/* 성별 */}
        <RadioButtonWrapper
          options={optionsMap.gender}
          onSelect={(selectedIndex) => handleRadioSelect("gender", selectedIndex)}
        />

        {/* 고교 유형 */}
        <RadioButtonWrapper
          options={optionsMap.school}
          onSelect={(selectedIndex) => handleRadioSelect("school", selectedIndex)}
        />

        {/* 학년 */}
        <CheckBoxWrapper
          options={optionsMap.gradeHighschool}
          selectedIndices={formData.gradeHighschool.map((value) => optionsMap.gradeHighschool.indexOf(value))}
          onSelectionChange={(selectedIndices) => handleCheckboxSelect("gradeHighschool", selectedIndices)}
        />

        {/* 과목 */}
        <CheckBoxWrapper
          options={optionsMap.subject}
          selectedIndices={formData.subject.map((value) => optionsMap.subject.indexOf(value))}
          onSelectionChange={(selectedIndices) => handleCheckboxSelect("subject", selectedIndices)}
        />

        {/* 수업 성향 */}
        <CheckBoxWrapper
          options={optionsMap.tendency}
          selectedIndices={formData.tendency.map((value) => optionsMap.tendency.indexOf(value))}
          onSelectionChange={(selectedIndices) => handleCheckboxSelect("tendency", selectedIndices)}
        />

        {/* 대면 여부 */}
        <RadioButtonWrapper
          options={optionsMap.face}
          onSelect={(selectedIndex) => handleRadioSelect("face", selectedIndex)}
        />

        {/* 시간당 금액 */}
        <RadioButtonWrapper
          options={optionsMap.payWant}
          onSelect={(selectedIndex) => handleRadioSelect("payWant", selectedIndex)}
        />

        {/* 소개글 */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ display: "block", fontSize: theme.typography.T6.fontSize }}>소개글</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: theme.typography.T7.fontSize,
              borderRadius: "5px",
              border: `1px solid ${theme.colors.primary}`,
            }}
          />
        </div>

        {/* 상세 내용 */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ display: "block", fontSize: theme.typography.T6.fontSize }}>상세 내용</label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: theme.typography.T7.fontSize,
              borderRadius: "5px",
              border: `1px solid ${theme.colors.primary}`,
            }}
          />
        </div>

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            fontSize: theme.typography.T6.fontSize,
            color: theme.colors.white,
            backgroundColor: theme.colors.primary,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          확인
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SignupStudent;
