const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/personalinfo2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((e) => {
    console.log("Connection failed", e);
  });


const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["남성", "여성"],
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      enum: ["일반고", "과학고/영재고", "자율고", "외고", "국제고", "해당없음"],
      required: true,
    },
    gradeHighschool: {
      type: [String],
      enum: [
        "초등학생",
        "중1",
        "중2",
        "중3",
        "고1",
        "고2",
        "고3",
        "재수생",
        "대학생",
        "기타"
      ],
    },
    otherGradeHighschool: {
      type: String,
      required: function () {
        return this.gradeHighschool === "기타";
      },
    },
    subject: {
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
      required: true,
    },
    tendency: {
      type: [String],
      enum: [
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
      required: true,
    },
    location: {
      type: String,
      enum: ["상관없음", "강사 → 학생", "학생 → 강사"],
      required: true,
    },
    face: {
      type: String,
      enum: ["상관없음", "대면", "비대면"],
      required: true,
    },
    payWant: {
      type: String,
      enum: ["상관없음", "~3만원", "~4만원", "~5만원"],
    },
    introduction: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
