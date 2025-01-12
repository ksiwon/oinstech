const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/personalinfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((e) => {
    console.log("Connection failed", e);
  });

const logInSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
      required: true,
    },
    학생_성별: {
      type: String,
      enum: ["상관없음", "남성", "여성"],
    },
    고교_유형: {
      type: String,
      enum: ["상관없음", "일반고", "과학고/영재고", "자율고", "외고", "국제고"],
    },
    학년: {
      type: [String],
      enum: [
        "상관없음",
        "초등학생",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3",
        "재수생",
        "대학생",
      ],
    },
    과목: {
      type: [String],
      enum: [
        "국어",
        "수학",
        "영어",
        "물리학",
        "화학",
        "생명과학",
        "지구과학",
        "정보/코딩",
      ],
    },
    수업_성향: {
      type: [String],
      enum: [
        "상관없음",
        "개념부터 차근차근",
        "문제 풀이 중심",
        "내신 집중",
        "수능 집중",
        "단기간 집중 학습",
        "선행 위주 수업",
        "창의력 강화",
        "복습과 반복 강조",
        "약점 집중 보완",
      ],
    },
    장소: {
      type: String,
      enum: ["상관없음", "강사 → 학생", "학생 → 강사"],
    },
    대면_여부: {
      type: String,
      enum: ["상관없음", "대면", "비대면"],
    },
    시간당_가격: {
      type: String,
      enum: ["상관없음", "3만원~", "4만원~", "5만원~"],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

const TeacherCollection = mongoose.model("teacher", logInSchema);

module.exports = TeacherCollection;
