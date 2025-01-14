const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
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
      enum: ["teacher"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: [String],
      enum: ["남성", "여성"],
      required: true,
    },
    prefered_gender: {
        type: String,
        enum: ["남성", "여성"],
        required: true,
      },

    personality: {
    type: [String],
    enum: [
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
    },
    university: {
        type: String,
        enum: [
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
        required: true,
      },
      prefered_gradeHighschool: {
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
      otherUniversity: {
        type: String,
        required: function () {
          return this.university === "기타";
        },
      },
      major: {
        type: String,
        required: true,
      },
      gradeUniversity: {
        type: Number,
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
    city: {
      type: String,
      required: true,
    },
    district: {
        type: String,
        required: true,
        },
    neighborhood: {
        type: String,
        required: true,
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
    prefered_school: {
        type: [String],
        enum: ["일반고", "과학고/영재고", "자율고", "외고", "국제고", "해당없음"],
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
      type: [String],
      enum: ["강사 → 학생", "학생 → 강사"],
      required: true,
    },
    face: {
      type: [String],
      enum: ["대면", "비대면"],
      required: true,
    },
    pay: {
      type: Number,
      required: true,
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

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
