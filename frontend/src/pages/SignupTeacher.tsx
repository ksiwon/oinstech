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
  prefered_school: ["일반고", "과학고/영재고", "자율고", "외고", "국제고", "고교 미선호"],
  prefered_gradeHighschool: [
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
  university: [
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
  personality: [
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
  location: ["강사 → 학생", "학생 → 강사"],
  face: ["대면", "비대면"],
};

const SignupTeacher: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    role: "teacher",
    name: "",
    gender: "",
    prefered_gender: [] as string[],
    birth: new Date(),
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    university: "",
    otherUniversity: "",
    major: "",
    gradeUniversity: "",
    personality: [] as string[],
    subject: [] as string[],
    prefered_school: [] as string[],
    prefered_gradeHighschool: [] as string[],
    tendency: [] as string[],
    face: [] as string[],
    pay: 0,
    introduction: "",
    detail: "",
    location: [] as string[],
  });

  const handleSubmit = async () => {
    const requiredFields = [
      "id",
      "password",
      "name",
      "gender",
      "birth",
      "phone",
      "city",
      "district",
      "neighborhood",
      "university",
      "major",
      "gradeUniversity",
      "personality",
      "subject",
      "prefered_school",
      "prefered_gradeHighschool",
      "tendency",
      "face",
      "pay",
      "introduction",
      "detail",
      "location",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field as keyof typeof formData];
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return value === "" || value === null || value === undefined;
    });

    if (missingFields.length > 0) {
      alert(`다음 값을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/teachers", formData);
      console.log("Teacher created:", response.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error("Error creating teacher:", error);
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
    <div style={{ margin: "auto" }}>
      <Header />
      <Title text="강사 회원가입" />

      <Wrapper>
        <Content>
          <ContentName>ID</ContentName>
          <ContentInput>
            <input type="text" name="id" value={formData.id} onChange={handleInputChange} />
          </ContentInput>
        </Content>

        <Content>
          <ContentName>Password</ContentName>
          <ContentInput>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </ContentInput>
        </Content>

        <Content>
          <ContentName>이름</ContentName>
          <ContentInput>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </ContentInput>
        </Content>

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

        <Content>
          <ContentName>휴대폰 번호</ContentName>
          <ContentInput>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
          </ContentInput>
        </Content>

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

        <Content>
          <ContentName>대학교</ContentName>
          <ContentInputContainer>
            {optionsMap.university.map((university) => (
              <ContentInput key={university}>
                <input
                  type="radio"
                  name="university"
                  value={university}
                  checked={formData.university === university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                />
                {university}
              </ContentInput>
            ))}
          </ContentInputContainer>
        </Content>

        <Content>
          <ContentName>전공</ContentName>
          <ContentInput>
            <input type="text" name="major" value={formData.major} onChange={handleInputChange} />
          </ContentInput>
        </Content>

        <Content>
          <ContentName>학번</ContentName>
          <ContentInput>
            <input type="text" name="gradeUniversity" value={formData.gradeUniversity} onChange={handleInputChange} />
          </ContentInput>
        </Content>

        <Content>
          <ContentName>성격 (1~3개)</ContentName>
          <ContentInputContainer>
            {optionsMap.personality.map((personality) => (
              <ContentInput key={personality}>
                <input
                  type="checkbox"
                  checked={formData.personality.includes(personality)}
                  onChange={() => handleCheckboxSelect("personality", personality)}
                />
                {personality}
              </ContentInput>
            ))}
          </ContentInputContainer>
        </Content>

        <Content>
          <ContentName>수업성향 (1~2개)</ContentName>
          <ContentInputContainer>
            {optionsMap.tendency.map((tendency) => (
              <ContentInput key={tendency}>
                <input
                  type="checkbox"
                  checked={formData.tendency.includes(tendency)}
                  onChange={() => handleCheckboxSelect("tendency", tendency)}
                />
                {tendency}
              </ContentInput>
            ))}
          </ContentInputContainer>
        </Content>

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

      <Content>
        <ContentName>선호 학생 성별</ContentName>
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

        <Content>
          <ContentName>선호 고교 유형</ContentName>
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

        <Content>
          <ContentName>선호 학년</ContentName>
          <ContentInputContainer>
            {optionsMap.prefered_gradeHighschool.map((grade) => (
              <ContentInput key={grade}>
                <input
                  type="checkbox"
                  checked={formData.prefered_gradeHighschool.includes(grade)}
                  onChange={() => handleCheckboxSelect("prefered_gradeHighschool", grade)}
                />
                {grade}
              </ContentInput>
            ))}
          </ContentInputContainer>
        </Content>

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

        <Content>
          <ContentName>시간당 금액</ContentName>
          <ContentInput>
            <input
              type="number"
              name="pay"
              value={formData.pay}
              onChange={handleInputChange}
            />
          </ContentInput>
        </Content>

        <Content>
          <ContentName>소개</ContentName>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleInputChange}
          />
        </Content>

        <Content>
          <ContentName>상세 내용</ContentName>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
          />
        </Content>
      </Wrapper>

      <ButtonContainer>
        <Button1 onClick={() => navigate(-1)}>이전</Button1>
        <Button2 onClick={() => handleSubmit()}>회원가입</Button2>
      </ButtonContainer>
      <Footer />
    </div>
  );
};

export default SignupTeacher;

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
  white-space: nowrap;
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
  background: var(--Primary, #38E);
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
  background: var(--Gray-400, #AFAFAF);
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
`;

const Button2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--Primary, #38E);
  width: 160px;
  height: 56px;
  border-radius: 8px;
  background: var(--White, #FFF);
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
`;
