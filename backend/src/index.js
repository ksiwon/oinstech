const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
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

// Group Schema
const groupSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // 그룹 고유 ID
  teacherId: { type: String, required: true }, // 강사 ID
  name: { type: String, required: true }, // 리더 이름
  gender: { type: String, required: true }, // 리더 성별
  university: { type: String, required: true }, // 리더 대학
  major: { type: String, required: true }, // 리더 전공
  gradeUniversity: { type: Number, required: true }, // 리더 학년
  pay: { type: Number, required: true }, // 시간당 수업료
  introduction: { type: String, required: true }, // 그룹 소개
  detail: { type: String, required: true }, // 세부 설명
  subject: { type: String, required: true }, // 수업 과목
  personality: { type: [String], required: true }, // 리더 성격
  tendency: { type: [String], required: true }, // 수업 방식
  address: { type: String, required: true }, // 구체적인 주소
  personnel: { type: Number, required: true }, // 최대 참여 인원
  currentPersonnel: { type: Number, default: 0 }, // 현재 참여 인원
});

const Group = mongoose.model("Group", groupSchema);

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
      const isMatch = (password === student.password);
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
      const isMatch = (password === teacher.password);
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


// Match teachers based on student preferences (with search)
app.get("/api/match-teachers/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { page = 1, limit = 10, search = "" } = req.query; // 검색어 추가
  const skip = (page - 1) * parseInt(limit, 10);

  try {
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ message: "학생 정보를 찾을 수 없습니다." });
    }
    const {
      prefered_gender,
      prefered_school,
      prefered_personality,
      subject,
      prefered_tendency,
      location,
      payWant,
    } = student;

    let payRange = {};
    switch (payWant) {
      case "~3만원":
        payRange = { pay: { $gte: 0, $lte: 30000 } };
        break;
      case "~4만원":
        payRange = { pay: { $gte: 30001, $lte: 40000 } };
        break;
      case "~5만원":
        payRange = { pay: { $gte: 40001, $lte: 50000 } };
        break;
      case "상관 없음":
        payRange = { pay: { $gte: 0 } };
        break;
      default:
        payRange = {};
    }

    // 검색어가 있으면 name 필터 추가 (대소문자 구분 없이)
    const searchFilter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    // 모든 강사를 대상으로 조회 (검색 필터 및 pay 필터 적용)
    const allTeachers = await Teacher.find({
      ...payRange,
      ...searchFilter,
    });

    const teachersWithScores = allTeachers.map((teacher) => {
      let score = 0;
      if (prefered_gender.includes(teacher.gender)) score++;
      if (prefered_school.includes(teacher.university)) score++;
      if (
        teacher.personality &&
        teacher.personality.some((p) => prefered_personality.includes(p))
      )
        score++;
      if (subject.includes(teacher.subject)) score++;
      if (
        teacher.tendency &&
        teacher.tendency.some((t) => prefered_tendency.includes(t))
      )
        score++;
      if (location.includes(teacher.location)) score++;
      return { id: teacher._id, ...teacher.toObject(), score };
    });

    teachersWithScores.sort((a, b) => b.score - a.score);
    const paginatedTeachers = teachersWithScores.slice(
      skip,
      skip + parseInt(limit, 10)
    );
    const total = teachersWithScores.length;

    res.status(200).json({ teachers: paginatedTeachers, total });
  } catch (error) {
    console.error("Error matching teachers:", error);
    res.status(500).json({ message: "Error matching teachers.", error });
  }
});

// Match students based on teacher preferences (with search)
app.get("/api/match-students/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  const { page = 1, limit = 10, search = "" } = req.query; // 검색어 추가
  const skip = (page - 1) * parseInt(limit, 10);

  try {
    const teacher = await Teacher.findOne({ id: teacherId });
    if (!teacher) {
      return res.status(404).json({ message: "강사 정보를 찾을 수 없습니다." });
    }

    const {
      prefered_gender,
      prefered_school,
      personality,
      subject,
      prefered_gradeHighschool,
      location,
    } = teacher;

    // 검색어가 있으면 학생 name 필터 적용
    const searchFilter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const allStudents = await Student.find(searchFilter);

    const studentsWithScores = allStudents.map((student) => {
      let score = 0;
      if (prefered_gender.includes(student.gender)) score++;
      if (prefered_school.includes(student.school)) score++;
      if (
        student.prefered_personality &&
        student.prefered_personality.some((p) => personality.includes(p))
      )
        score++;
      if (subject.includes(student.subject)) score++;
      if (prefered_gradeHighschool.includes(student.gradeHighschool)) score++;
      if (location.includes(student.location)) score++;
      return { id: student._id, ...student.toObject(), score };
    });

    studentsWithScores.sort((a, b) => b.score - a.score);
    const paginatedStudents = studentsWithScores.slice(
      skip,
      skip + parseInt(limit, 10)
    );
    const total = studentsWithScores.length;

    res.status(200).json({ students: paginatedStudents, total });
  } catch (error) {
    console.error("Error matching students:", error);
    res.status(500).json({ message: "Error matching students.", error });
  }
});

// 학생 Otherpage용 API
app.post("/api/students/find", async (req, res) => {
  const { id } = req.body;

  try {
    // ID로 학생 찾기
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ message: "존재하지 않는 ID입니다." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("불러오기 오류:", error);
    res.status(500).json({ message: "불러오기 중 오류가 발생했습니다.", error });
  }
});

// 강사 Otherpage용 API
app.post("/api/teachers/find", async (req, res) => {
  const { id } = req.body;

  try {
    // ID로 학생 찾기
    const teacher = await Teacher.findOne({ id });
    if (!teacher) {
      return res.status(404).json({ message: "존재하지 않는 ID입니다." });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error("불러오기 오류:", error);
    res.status(500).json({ message: "불러오기 중 오류가 발생했습니다.", error });
  }
});

// List
app.get('/api/teachers/list', async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
      const teachers = await Teacher.find().skip(skip).limit(parseInt(limit));
      const total = await Teacher.countDocuments();

      res.json({ teachers, total });
  } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/api/students/list', async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
      const students = await Student.find().skip(skip).limit(parseInt(limit));
      const total = await Student.countDocuments();

      res.json({ students, total });
  } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// Group APIs

// Generate Unique Group ID
const generateUniqueGroupId = async () => {
  let uniqueId = "";
  let isUnique = false;

  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 10000);
    uniqueId = `group_${randomNum}`;
    const existingGroup = await Group.findOne({ id: uniqueId });
    isUnique = !existingGroup;
  }

  return uniqueId;
};

// Create Group with Unique ID
app.post("/api/groups", async (req, res) => {
  try {
    const uniqueId = await generateUniqueGroupId();
    const groupData = { ...req.body, id: uniqueId };

    const newGroup = new Group(groupData);
    await newGroup.save();

    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Failed to create group", error });
  }
});

// List Groups with Pagination and Optional Filtering
app.get("/api/groups", async (req, res) => {
  const { teacherId, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // teacherId로 필터링
    const query = teacherId ? { teacherId } : {}; // teacherId가 있으면 필터링, 없으면 전체 검색
    const groups = await Group.find(query).skip(skip).limit(parseInt(limit));
    const total = await Group.countDocuments(query); // 동일한 query로 문서 수 계산

    res.status(200).json({ groups, total });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Update Group
app.put("/api/groups/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedGroup = await Group.findOneAndUpdate({ id }, updatedData, {
      new: true,
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Failed to update group", error });
  }
});

// Delete Group
app.delete("/api/groups/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGroup = await Group.findOneAndDelete({ id });

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Failed to delete group", error });
  }
});

// Get Group by ID
app.get("/api/groups/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 해당 id를 가진 그룹을 찾기
    const group = await Group.findOne({ id });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Match groups based on student preferences (with search)
app.get("/api/match-groups/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * parseInt(limit, 10);

  try {
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ message: "학생 정보를 찾을 수 없습니다." });
    }

    const {
      prefered_gender = [],
      prefered_school = [],
      prefered_personality = [],
      prefered_tendency = [],
      subject: studentSubjects = []
    } = student;

    // 검색어가 있으면 그룹 name 필터 적용
    const searchFilter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const allGroups = await Group.find(searchFilter);

    const groupsWithScores = allGroups.map((group) => {
      let score = 0;
      if (prefered_gender.includes(group.gender)) score++;
      if (prefered_school.includes(group.university)) score++;
      if (studentSubjects.includes(group.subject)) score++;
      if (group.tendency && group.tendency.some(t => prefered_tendency.includes(t))) score++;
      if (group.personality && group.personality.some(p => prefered_personality.includes(p))) score++;
      return { id: group._id, ...group.toObject(), score };
    });

    groupsWithScores.sort((a, b) => b.score - a.score);
    const paginatedGroups = groupsWithScores.slice(skip, skip + parseInt(limit, 10));
    const total = groupsWithScores.length;

    res.status(200).json({ groups: paginatedGroups, total });
  } catch (error) {
    console.error("Error matching groups:", error);
    res.status(500).json({ message: "Error matching groups.", error });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
