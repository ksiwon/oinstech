import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Title from "../components/Title";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import regionHierarchy from "../assets/region_hierarchy.json";
import { theme } from "../styles/theme";
import axios from "axios";

// 지역 데이터 타입 정의
type RegionsType = {
    [city: string]: {
      [district: string]: string[];
    };
  };

const optionsMap = {
  gender: ["남성", "여성"],
  prefered_gender: ["남성", "여성"],
  school: ["일반고", "과학고/영재고", "자율고", "외고", "국제고", "해당없음"],
  gradeHighschool: [
    "초등학생",
    "중1",
    "중2",
    "중3",
    "고1",
    "고2",
    "고3",
    "재수생",
    "대학생",
    "기타",
  ],
  prefered_school: [
    "서울대학교",
    "연세대학교",
    "고려대학교",
    "KAIST",
    "POSTECH",
    "UNIST",
    "DGIST",
    "GIST",
    "성균관대학교",
    "한양대학교",
    "서강대학교",
    "중앙대학교",
    "경희대학교",
    "한국외국어대학교",
    "서울시립대학교",
    "건국대학교",
    "동국대학교",
    "부산대학교",
    "이화여자대학교",
    "숙명여자대학교",
    "기타",
  ],
  subject: [
    "국어",
    "수학",
    "영어",
    "물리학",
    "화학",
    "생명과학",
    "지구과학",
    "정보/코딩",
  ],
  prefered_tendency: [
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
  prefered_personality: [
    "열정적임",
    "친근함",
    "다정함",
    "유머러스함",
    "이해심 많음",
    "꼼꼼함",
    "책임감 강함",
    "차분함",
    "창의적임",
  ],
  location: ["강사 → 학생", "학생 → 강사"],
  face: ["대면", "비대면"],
  payWant: ["상관 없음", "~3만원", "~4만원", "~5만원"],
};

const SignupStudent: React.FC = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    role: "student",
    name: "",
    birth: new Date(),
    city: "",
    district: "",
    neighborhood: "",
    phone: "",
    location: [] as string[],
    gender: "",
    prefered_gender: [] as string[],
    school: "",
    gradeHighschool: "",
    otherGradeHighschool: "",
    prefered_school: [] as string[],
    subject: [] as string[],
    prefered_tendency: [] as string[],
    prefered_personality: [] as string[],
    face: [] as string[],
    payWant: "",
    introduction: "",
    detail: "",
  });

  const handleSubmit = async () => {
    // 필수 입력값을 확인
    const requiredFields = [
      "id",
      "password",
      "name",
      "birth",
      "city",
      "district",
      "neighborhood",
      "phone",
      "gender",
      "school",
      "gradeHighschool",
      "payWant",
      "location",
      "prefered_gender",
      "prefered_school",
      "subject",
      "prefered_tendency",
      "prefered_personality",
      "face",
    ];
  
    const missingFields = requiredFields.filter((field) => {
      const value = formData[field as keyof typeof formData];
  
      // 배열인지 확인
      if (Array.isArray(value)) {
        return value.length === 0; // 배열의 길이가 0인지 확인
      }
  
      // 문자열 또는 null/undefined 확인
      return value === "" || value === null || value === undefined;
    });
  
    if (missingFields.length > 0) {
        alert(`다음 값을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }
  
    try {
      // 중복이 없으면 새 학생 생성
      const response = await axios.post("http://localhost:5000/api/students", formData);
      console.log("Student created:", response.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error("Error creating student:", error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "중복된 ID입니다. 다른 ID를 입력해주세요.");
      } else {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxSelect = (key: keyof typeof formData, value: string) => {
    const currentValues = formData[key] as string[];
    if (currentValues.includes(value)) {
      setFormData({ ...formData, [key]: currentValues.filter((v) => v !== value) });
    } else {
      setFormData({ ...formData, [key]: [...currentValues, value] });
    }
  };

  const regions: RegionsType = regionHierarchy;

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState<string[]>([]);

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

  return (
  <GlobalWrapper>
    <Header />
      <Title text="학생 회원가입" />

      <Wrapper>

      {/* ID */}
      <Content>
        <ContentName>ID</ContentName>
        <ContentInput>
            <input type="text" name="id" value={formData.id} onChange={handleInputChange} />
        </ContentInput>
      </Content>

      {/* Password */}
      <Content>
        <ContentName>Password</ContentName>
        <ContentInput>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />
        </ContentInput>
      </Content>

      {/* Name */}
      <Content>
        <ContentName>이름</ContentName>
        <ContentInput>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </ContentInput>
      </Content>

      {/* 성별 */}
            <Content>
        <ContentName>성별</ContentName>
        <ContentInputContainer>
        {optionsMap.gender.map((gender) => (
          <ContentInput key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={formData.gender === gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            {gender}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 생년월일 */}
      <Content>
        <ContentName>생년월일</ContentName>
        <ContentInput>
        <DatePicker
          selected={formData.birth}
          onChange={(date: Date | null) => date && setFormData({ ...formData, birth: date })}
          dateFormat="yyyy년 MM월 dd일"
          dateFormatCalendar="yyyy년 MM월"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          showMonthDropdown
        />
        </ContentInput>
      </Content>

      {/* Phone */}
      <Content>
        <ContentName>휴대폰 번호</ContentName>
        <ContentInput>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
        </ContentInput>
      </Content>

        {/* 지역 */}
        <Content>
            <ContentName>지역</ContentName>
            <ContentInput>
                <select
                value={formData.city}
                onChange={handleCityChange}
                style={{
                    width: "100%",
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
                    width: "100%",
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
                    width: "100%",
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
            </ContentInput>
        </Content>

      {/* 학교 */}
      <Content>
        <ContentName>학교</ContentName>
        <ContentInputContainer>
        {optionsMap.school.map((school) => (
          <ContentInput key={school}>
            <input
              type="radio"
              name="school"
              value={school}
              checked={formData.school === school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            />
            {school}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 학년 */}
      <Content>
        <ContentName>학년</ContentName>
        <ContentInputContainer>
        {optionsMap.gradeHighschool.map((grade) => (
          <ContentInput key={grade}>
            <input
              type="radio"
              name="gradeHighschool"
              value={grade}
              checked={formData.gradeHighschool === grade}
              onChange={(e) => setFormData({ ...formData, gradeHighschool: e.target.value })}
            />
            {grade}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>
      
      {/* 과목 */}
      <Content>
        <ContentName>과목</ContentName>
        <ContentInputContainer>
        {optionsMap.subject.map((subject) => (
          <ContentInput key={subject}>
            <input
              type="checkbox"
              checked={formData.subject.includes(subject)}
              onChange={() => handleCheckboxSelect("subject", subject)}
            />
            {subject}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 선호 성별 */}
      <Content>
        <ContentName>선호 강사 성별</ContentName>
        <ContentInputContainer>
        {optionsMap.prefered_gender.map((gender) => (
          <ContentInput key={gender}>
            <input
              type="checkbox"
              checked={formData.prefered_gender.includes(gender)}
              onChange={() => handleCheckboxSelect("prefered_gender", gender)}
            />
            {gender}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 선호 강사 대학 */}
      <Content>
        <ContentName>선호 강사 대학</ContentName>
        <ContentInputContainer>
        {optionsMap.prefered_school.map((prefered_school) => (
          <ContentInput key={prefered_school}>
            <input
              type="checkbox"
              checked={formData.prefered_school.includes(prefered_school)}
              onChange={() => handleCheckboxSelect("prefered_school", prefered_school)}
            />
            {prefered_school}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 선호 성격 */}
      <Content>
        <ContentName>선호 강사 성격</ContentName>
        <ContentInputContainer>
        {optionsMap.prefered_personality.map((personality) => (
          <ContentInput key={personality}>
            <input
              type="checkbox"
              checked={formData.prefered_personality.includes(personality)}
              onChange={() => handleCheckboxSelect("prefered_personality", personality)}
            />
            {personality}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 수업 성향 */}
      <Content>
        <ContentName>선호 수업 성향</ContentName>
        <ContentInputContainer>
        {optionsMap.prefered_tendency.map((tendency) => (
          <ContentInput key={tendency}>
            <input
              type="checkbox"
              checked={formData.prefered_tendency.includes(tendency)}
              onChange={() => handleCheckboxSelect("prefered_tendency", tendency)}
            />
            {tendency}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 수업 위치 */}
      <Content>
        <ContentName>수업 위치</ContentName>
        <ContentInputContainer>
        {optionsMap.location.map((location) => (
          <ContentInput key={location}>
            <input
              type="checkbox"
              checked={formData.location.includes(location)}
              onChange={() => handleCheckboxSelect("location", location)}
            />
            {location}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 대면 여부 */}
      <Content>
        <ContentName>대면 여부</ContentName>
        <ContentInputContainer>
        {optionsMap.face.map((face) => (
          <ContentInput key={face}>
            <input
              type="checkbox"
              checked={formData.face.includes(face)}
              onChange={() => handleCheckboxSelect("face", face)}
            />
            {face}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 희망 금액 */}
      <Content>
        <ContentName>희망 시간당 금액</ContentName>
        <ContentInputContainer>
        {optionsMap.payWant.map((pay) => (
          <ContentInput key={pay}>
            <input
              type="radio"
              name="payWant"
              value={pay}
              checked={formData.payWant === pay}
              onChange={(e) => setFormData({ ...formData, payWant: e.target.value })}
            />
            {pay}
          </ContentInput>
        ))}
        </ContentInputContainer>
      </Content>

      {/* 소개 */}
      <Content>
        <ContentName>소개</ContentName>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleInputChange}
        />
      </Content>

      {/* 상세 내용 */}
      <Content>
        <ContentName>상세 내용</ContentName>
        <textarea name="detail" value={formData.detail} onChange={handleInputChange} />
      </Content>

      </Wrapper>

      {/* 제출 버튼 */}
      <ButtonContainer>
        <Button1 onClick={() => navigate(-1)}>이전</Button1>
        <Button2 onClick={() => handleSubmit()}>회원가입</Button2>
      </ButtonContainer>
      <Footer /> 
    </GlobalWrapper>
  );
};

export default SignupStudent;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px 192px;
`;

const ContentName = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    width: 140px;
    text-align: right;
    white-space: nowrap; /* 줄바꿈 방지 */
    margin-right: 16px;
    flex-shrink: 0;
`;

const ContentInput = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

const ContentInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
    margin: 0 auto 0 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary};
    padding: 16px 0;
`;

const Button1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--White, #FFF);
    width: 160px;
    height: 56px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gray[400]};

    align-item: center;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
`

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary};
    width: 160px;
    height: 56px;
    border-radius: 8px;
    background: var(--White, #FFF);

    align-item: center;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
`