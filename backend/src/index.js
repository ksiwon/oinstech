const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo_student");
const TeacherCollection = require("./mongo_teacher");  // Import the teacher collection
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../tempelates');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// 회원가입 화면 렌더링
app.get('/signup', (req, res) => {
    res.render('signup');
});

// 로그인 화면 렌더링
app.get('/', (req, res) => {
    res.render('login');
});

// 홈 화면 렌더링
app.get('/home', (req, res) => {
    res.render('home');
});

// Route to render the student-specific signup page
app.get('/signup/student', (req, res) => {
    res.render('signup_student');
});

// Route to render the student-specific signup page
app.get('/signup/teacher', (req, res) => {
    res.render('signup_teacher');
});



// Route to handle student signup form submission
app.post('/signup/student', async (req, res) => {
    const { name, password, studentInfo } = req.body;

    // // Validate required fields
    // if (!name || !password || !studentInfo) {
    //     return res.status(400).send("모든 필드를 입력해주세요.");
    // }

    const data = {
        name,
        password,
        role: 'student',
        ...studentInfo
    };
    

    try {
        // Insert student data into the collection
        await LogInCollection.create(data);
        res.status(201).render("home", { naming: `${name}` });
    } catch (error) {
        console.error(error);
        res.status(500).send("서버 오류로 인해 회원가입에 실패했습니다.");
    }
});

// 강사 회원가입 처리
app.post('/signup/teacher', async (req, res) => {
    const { name, password, teacherInfo } = req.body; // 'teacherInfo'로 수정

    // // 필수 필드 확인
    // if (!name || !password || !teacherInfo) {
    //     return res.status(400).send("모든 필드를 입력해주세요.");
    // }

    const data = {
        name,
        password,
        role: 'teacher',
        ...teacherInfo, // teacherInfo 객체의 데이터 병합
    };

    try {
        // 강사 데이터 저장
        await TeacherCollection.create(data);
        res.status(201).render("home", { naming: `${name}` });
    } catch (error) {
        console.error("강사 데이터 저장 오류:", error);
        res.status(500).send("서버 오류로 인해 회원가입에 실패했습니다.");
    }
});

// 회원가입 처리
app.post('/signup', async (req, res) => {
    const { name, password, role, studentInfo, teacherInfo } = req.body;
    
    // 유효성 검사: role은 반드시 teacher 또는 student여야 함
    if (role !== 'teacher' && role !== 'student') {
        return res.send("Invalid role. Please choose either 'teacher' or 'student'.");
    }

    const data = {
        name: req.body.name,
        password: req.body.password,
        role: req.body.role, // 사용자가 선택한 역할 추가
    };

    // 학생 정보와 강사 정보 처리
    if (role === 'student') {
        const studentData = {
            학생_성별: studentInfo.학생_성별,
            고교_유형: studentInfo.고교_유형,
            학년: studentInfo.학년,
            과목: studentInfo.과목,
            수업_성향: studentInfo.수업_성향,
            장소: studentInfo.장소,
            대면_여부: studentInfo.대면_여부,
            시간당_가격: studentInfo.시간당_가격
        };

        // 학생 데이터 삽입
        await Student.create({ ...data, ...studentData });
    } else if (role === 'teacher') {
        const teacherData = {
            강사_성별: teacherInfo.강사_성별,
            강사_대학: teacherInfo.강사_대학,
            강사_성격: teacherInfo.강사_성격,
            과목: teacherInfo.과목,
            수업_성향: teacherInfo.수업_성향,
            장소: teacherInfo.장소,
            대면_여부: teacherInfo.대면_여부,
            시간당_가격: teacherInfo.시간당_가격
        };

        // 강사 데이터 삽입
        await Teacher.create({ ...data, ...teacherData });
    }

    res.status(221).render("home", { naming: `${req.body.password}+${req.body.name}` });
});



// 로그인 처리
app.post('/login', async (req, res) => {
    try {
        // 학생 컬렉션에서 사용자 확인
        const student = await LogInCollection.findOne({ name: req.body.name });
        // 강사 컬렉션에서 사용자 확인
        const teacher = await TeacherCollection.findOne({ name: req.body.name });

        // 학생 또는 강사 정보가 존재하는지 확인
        const user = student || teacher;

        if (user && user.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}`, role: user.role });
        } else {
            res.send("Incorrect username or password");
        }
    } catch (e) {
        res.send("Wrong details");
    }
});


app.listen(port, () => {
    console.log('Port connected');
});
