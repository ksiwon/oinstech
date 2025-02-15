import {CardFrame, TopFrame, ImageFrame, TopContent, TopContentAbove, TopName, TopFlagLocFrame, TopFlag, TopLoc, TopContentBelow, CenterFrame, BottomFrame, BottomName, BottomContentAbove, BottomContentBelow} from "./Card.styles";
import SubjectSmall from "./SubjectSmall";
import { useNavigate } from "react-router-dom";

interface StudentCardProps {
    id: string;
    name: string;
    gradeHighschool: string;
    neighborhood: string;
    introduction: string;
    subject: string[];
    prefered_personality: string[];
    prefered_tendency: string[];
    score: number;
    gender: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ id, name, gradeHighschool, neighborhood, introduction, subject, prefered_personality, prefered_tendency, score, gender }) => {
    const navigate = useNavigate();
    return (
        <CardFrame onClick={() => navigate("/search/student/"+id)}>
            <TopFrame>
                <ImageFrame gender={gender}>
                    <i className="fas fa-user"></i>
                </ImageFrame>
                <TopContent>
                    <TopContentAbove>
                        <TopName>{name}</TopName>
                        <TopFlagLocFrame>
                            <TopFlag>
                                <i className="fas fa-flag"></i>
                            </TopFlag>
                            <TopLoc>{neighborhood}</TopLoc>
                            <TopFlag style={{ color: "#DFC100" }}>
                                <i className="fas fa-star"></i>
                            </TopFlag>
                            <TopLoc>{score}</TopLoc>
                        </TopFlagLocFrame>
                    </TopContentAbove>
                    <TopContentBelow>
                        {gradeHighschool}
                    </TopContentBelow>
                </TopContent>
            </TopFrame>
            <CenterFrame gender={gender}>
                {introduction}
            </CenterFrame>
            <BottomFrame>
               <BottomName>수업 과목</BottomName>
               <BottomContentAbove>
                <SubjectSmall subjects={subject.map((subject) => {
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
                    })} />
                </BottomContentAbove>
            </BottomFrame>
            <BottomFrame>
               <BottomName>강사 특징</BottomName>
               <BottomContentBelow>
                    {prefered_personality.map((item, index) => (
                        <div key={index}># {item}</div>
                    ))}
                 </BottomContentBelow>
                 <BottomContentBelow>
                    {prefered_tendency.map((item, index) => (
                        <div key={index}># {item}</div>
                    ))}
                 </BottomContentBelow>
            </BottomFrame>
        </CardFrame>
    );
}

export default StudentCard;
