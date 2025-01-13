const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*"}));

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Student Schema
const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student"], required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  prefered_gender: { type: [String], required: true },
  birth: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  neighborhood: { type: String, required: true },
  phone: { type: String, required: true },
  school: { type: String, required: true },
  prefered_school: { type: [String], required: true },
  prefered_personality: { type: [String], required: true },
  gradeHighschool: { type: [String] },
  otherGradeHighschool: { type: String },
  subject: { type: [String], required: true },
  prefered_tendency: { type: [String], required: true },
  face: { type: [String], required: true },
  payWant: { type: String },
  introduction: { type: String, required: true },
  detail: { type: String, required: true },
  location: { type: [String], required: true },
});

const Student = mongoose.model("Student", studentSchema);

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher"], required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  prefered_gender: { type: [String], required: true },
  prefered_personality: { type: [String], required: true },
  birth: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  neighborhood: { type: String, required: true },
  university: { type: String, required: true },
  prefered_gradeHighschool: { type: [String], required: true },
  otherUniversity: { type: String },
  major: { type: String, required: true },
  gradeUniversity: { type: String, required: true },
  personality: { type: [String], required: true },
  subject: { type: [String], required: true },
  prefered_school: { type: [String], required: true },
  tendency: { type: [String], required: true },
  face: { type: [String], required: true },
  pay: { type: Number, required: true },
  introduction: { type: String, required: true },
  detail: { type: String, required: true },
  location: { type: [String], required: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// 학생 API
app.post("/api/students", async (req, res) => {
  const studentData = req.body;

  try {
    // 중복 확인
    const existingStudent = await Student.findOne({ id: studentData.id });
    if (existingStudent) {
        return res.status(400).json({ message: "Student with this ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    studentData.password = hashedPassword;
    
    const newStudent = new Student(studentData);
    await newStudent.save();
    res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Failed to create student", error });
  }
});

// 선생님 API
app.post("/api/teachers", async (req, res) => {
  const teacherData = req.body;

  try {
    // 중복 확인
    const existingTeacher = await Teacher.findOne({ id: teacherData.id });
    if (existingTeacher) {
        return res.status(400).json({ message: "Teacher with this ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(teacherData.password, 10);
    teacherData.password = hashedPassword;

    const newTeacher = new Teacher(teacherData);
    await newTeacher.save();
    res.status(201).json({ message: "Teacher created successfully", teacher: newTeacher });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ message: "Failed to create teacher", error });
  }
});

// 학생 로그인 API
app.post("/api/students/login", async (req, res) => {
    const { id, password } = req.body;
  
    try {
      // ID로 학생 찾기
      const student = await Student.findOne({ id });
      if (!student) {
        return res.status(404).json({ message: "존재하지 않는 ID입니다." });
      }
  
      // 비밀번호 검증
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      }
  
      // 비밀번호와 일치하면 학생 정보 반환
      res.status(200).json(student);
    } catch (error) {
      console.error("학생 로그인 오류:", error);
      res.status(500).json({ message: "로그인 처리 중 오류가 발생했습니다.", error });
    }
});

// 선생생 로그인 API
app.post("/api/teachers/login", async (req, res) => {
    const { id, password } = req.body;
  
    try {
      // ID로 학생 찾기
      const teacher = await Teacher.findOne({ id });
      if (!teacher) {
        return res.status(404).json({ message: "존재하지 않는 ID입니다." });
      }
  
      // 비밀번호 검증
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
      }
  
      // 비밀번호와 일치하면 학생 정보 반환
      res.status(200).json(teacher);
    } catch (error) {
      console.error("선생 로그인 오류:", error);
      res.status(500).json({ message: "로그인 처리 중 오류가 발생했습니다.", error });
    }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
