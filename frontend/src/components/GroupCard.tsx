import { useNavigate } from "react-router-dom";
import {CardFrame, TopFrame, ImageFrame, TopContent, TopContentAbove, TopName, TopFlagLocFrame, TopFlag, TopLoc, TopContentBelow, CenterFrame, BottomFrame, BottomName, BottomContentAbove, BottomContentBelow, SubjectAddressWrapper, SubjectWrapper} from "./Card.styles";
import SubjectSmall from "./SubjectSmall";

interface GroupCardProps {
    id: string;
    name: string;
    university: string;
    major: string;
    gradeUniversity: number;
    introduction: string;
    subject: string;
    personality: string[];
    tendency: string[];
    address: string;
    personnel: number;
    currentPersonnel: number;
    score: number;
    gender: string;
    onClick?: () => void;
}

function GetSubject(subject: string) {
    switch (subject) {
        case "국어":
            return "국어";
        case "영어":
            return "영어";
        case "수학":
            return "수학";
        case "물리학":
            return "물리";
        case "화학":
            return "화학";
        case "생명과학":
            return "생물";
        case "지구과학":
            return "지학";
        case "정보/코딩":
            return "정보";
        default:
            return subject;
    }
}

const GroupCard: React.FC<GroupCardProps> = ({ id, name, university, major, gradeUniversity, introduction, subject, personality, tendency, address, personnel, currentPersonnel, score, gender, onClick }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(`/search/group/${id}`);
        };
    };

    return (
        <CardFrame onClick={handleNavigate}>
            <TopFrame>
                <ImageFrame gender={gender}>
                    <i className="fas fa-user"></i>
                </ImageFrame>
                <TopContent>
                    <TopContentAbove>
                        <TopName>{name}</TopName>
                        <TopFlagLocFrame>
                            <TopFlag>
                                <i className="fas fa-user"></i>
                            </TopFlag>
                            <TopLoc>{currentPersonnel} / {personnel}</TopLoc>
                            <TopFlag style={{ color: "#DFC100" }}>
                                <i className="fas fa-star"></i>
                            </TopFlag>
                            <TopLoc>{score}</TopLoc>
                        </TopFlagLocFrame>
                    </TopContentAbove>
                    <TopContentBelow>
                        {university} {major} {gradeUniversity}
                    </TopContentBelow>
                </TopContent>
            </TopFrame>
            <CenterFrame gender={gender}>
                {introduction}
            </CenterFrame>
            <SubjectAddressWrapper>
            <SubjectWrapper>
                <BottomName>수업 과목</BottomName>
                <BottomContentAbove>
                    <SubjectSmall subjects={[GetSubject(subject)]} />
                </BottomContentAbove>
                </SubjectWrapper>
                <BottomFrame>
                    <BottomName>수업 장소</BottomName>
                    <BottomContentBelow>{address}</BottomContentBelow>
                </BottomFrame>
            </SubjectAddressWrapper>
            <BottomFrame>
               <BottomName>강사 특징</BottomName>
               <BottomContentBelow>
                    {personality.map((item, index) => (
                        <div key={index}># {item}</div>
                    ))}
                 </BottomContentBelow>
                 <BottomContentBelow>
                    {tendency.map((item, index) => (
                        <div key={index}># {item}</div>
                    ))}
                 </BottomContentBelow>
            </BottomFrame>
        </CardFrame>
    );
}

export default GroupCard;

