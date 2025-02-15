import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Title from "../components/Title";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

// Define the group data type
interface GroupData {
  id: string;
  teacherId: string;
  name: string;
  gender: string;
  university: string;
  major: string;
  gradeUniversity: number;
  pay: number;
  introduction: string;
  detail: string;
  subject: string;
  personality: string[];
  tendency: string[];
  address: string;
  personnel: number;
  currentPersonnel: number;
}

const CreateGroup: React.FC = () => {
  const navigate = useNavigate();
  const teacher = useSelector((state: RootState) => state.user.teacherData);

  const [formData, setFormData] = useState<GroupData>({
    id: "",
    teacherId: teacher?.id || "",
    name: teacher?.name || "",
    gender: teacher?.gender || "",
    university: teacher?.university || "",
    major: teacher?.major || "",
    gradeUniversity: teacher?.gradeUniversity || 0,
    pay: 0,
    introduction: "",
    detail: "",
    subject: "",
    personality: [],
    tendency: [],
    address: "",
    personnel: 0,
    currentPersonnel: 0,
  });

  const [existingIds, setExistingIds] = useState<string[]>([]);

  // Fetch existing group IDs to avoid duplicates
  useEffect(() => {
    const fetchGroupIds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/groups");
        const ids = response.data.map((group: GroupData) => group.id);
        setExistingIds(ids);
      } catch (error) {
        console.error("Error fetching group IDs:", error);
      }
    };
    fetchGroupIds();
  }, []);

  const generateUniqueId = (): string => {
    let id = "";
    do {
      const randomNum = Math.floor(Math.random() * 10000);
      id = `group_${randomNum}`;
    } while (existingIds.includes(id));
    return id;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, subject: e.target.value }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "pay",
      "introduction",
      "detail",
      "subject",
      "address",
      "personnel",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof GroupData]
    );

    if (missingFields.length > 0) {
      alert(`다음 값을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const uniqueId = generateUniqueId();
      const newGroup = { ...formData, id: uniqueId };
      await axios.post("http://localhost:5000/api/groups", newGroup);
      alert("그룹 생성이 완료되었습니다.");
      navigate("/mygroup");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("그룹 생성 중 오류가 발생했습니다.");
    }
  };

  const subjectOptions = [
    "국어",
    "수학",
    "영어",
    "물리학",
    "화학",
    "생명과학",
    "지구과학",
    "정보/코딩",
  ];

  return (
    <GlobalWrapper>
      <Header />
      <Title text="그룹 생성" />
      <FormWrapper>
        <Content>
          <Label>수업료</Label>
          <Input
            type="number"
            name="pay"
            value={formData.pay}
            onChange={handleInputChange}
          />
        </Content>
        <Content>
          <Label>소개</Label>
          <Textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleInputChange}
          />
        </Content>
        <Content>
          <Label>상세 정보</Label>
          <Textarea
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
          />
        </Content>
        <Content>
          <Label>과목</Label>
          <RadioGroup>
            {subjectOptions.map((subject) => (
              <RadioLabel key={subject}>
                <input
                  type="radio"
                  name="subject"
                  value={subject}
                  checked={formData.subject === subject}
                  onChange={handleSubjectChange}
                />
                {subject}
              </RadioLabel>
            ))}
          </RadioGroup>
        </Content>
        <Content>
          <Label>주소</Label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Content>
        <Content>
          <Label>모집 인원</Label>
          <Input
            type="number"
            name="personnel"
            value={formData.personnel}
            onChange={handleInputChange}
          />
        </Content>
      </FormWrapper>
      <ButtonContainer>
        <Button1 onClick={() => navigate(-1)}>이전</Button1>
        <Button2 onClick={handleSubmit}>그룹 생성</Button2>
      </ButtonContainer>
      <Footer />
    </GlobalWrapper>
  );
};

export default CreateGroup;

const GlobalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gray[100]};
`;

const FormWrapper = styled.div`
  width: 100%;
  padding: 32px 10%;
  margin-bottom: auto;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-family: pretendard;
  flex-shrink: 0;
  text-align: right;
  width: 100px;
  display: block;
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  font-family: ${({ theme }) => theme.typography.T4.fontFamily};
  color: ${({ theme }) => theme.colors.primary};
`;

const Input = styled.input`
  font-family: pretendard;
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
  font-family: ${({ theme }) => theme.typography.T5.fontFamily};
`;

const Textarea = styled.textarea`
  font-family: pretendard;
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.T4.fontSize};
  font-weight: ${({ theme }) => theme.typography.T4.fontWeight};
  font-family: ${({ theme }) => theme.typography.T4.fontFamily};
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
  font-family: ${({ theme }) => theme.typography.T5.fontFamily};
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
    color: ${({ theme }) => theme.colors.white};
    width: 144px;
    height: 48px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gray[400]};

    align-item: center;
    font-size: ${({ theme }) => theme.typography.T2.fontSize};
    font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
    cursor: pointer;
`

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary};
    width: 144px;
    height: 48px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};

    align-item: center;
    font-size: ${({ theme }) => theme.typography.T2.fontSize};
    font-weight: ${({ theme }) => theme.typography.T2.fontWeight};
    cursor: pointer;
`
