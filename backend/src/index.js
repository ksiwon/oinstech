const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo_signup"); // 학생/강사 컬렉션 통합
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

// 회원가입 화면 렌더링
app.get("/signup", (req, res) => {
    res.render("signup");
});

// 로그인 화면 렌더링
app.get("/", (req, res) => {
    res.render("login");
});

// 홈 화면 렌더링
app.get("/home", (req, res) => {
    res.render("home");
});

// 학생 회원가입 화면
app.get("/signup/student", (req, res) => {
    res.render("signup_student");
});

// 강사 회원가입 화면
app.get("/signup/teacher", (req, res) => {
    res.render("signup_teacher");
});



// 학생 회원가입 처리
app.post("/signup/student", async (req, res) => {
    const {
        id,
        password,
        name,
        gender,
        birth,
        phone,
        address,
        school,
        gradeHighschool,
        otherGradeHighschool,
        subject,
        tendency,
        location,
        face,
        payWant,
        introduction,
        detail
    } = req.body;

    const data = {
        id,
        password,
        role: "student",
        name,
        gender,
        birth,
        phone,
        address,
        school,
        gradeHighschool,
        otherGradeHighschool,
        subject,
        tendency,
        location,
        face,
        payWant,
        introduction,
        detail
    };

    try {
        await LogInCollection.create(data);
        res.status(201).render("home", { naming: `${name}` });
    } catch (error) {
        console.error("학생 회원가입 오류:", error);
        res.status(500).send("회원가입에 실패했습니다.");
    }
});

// 강사 회원가입 처리
app.post("/signup/teacher", async (req, res) => {
    const {
        id,
        password,
        name,
        gender,
        birth,
        phone,
        address,
        university,
        otherUniversity,
        major,
        gradeUniversity,
        personality,
        subject,
        tendency,
        location,
        face,
        pay,
        introduction,
        detail
    } = req.body;

    const data = {
        id,
        password,
        role: "teacher",
        name,
        gender,
        birth,
        phone,
        address,
        university,
        otherUniversity,
        major,
        gradeUniversity,
        personality,
        subject,
        tendency,
        location,
        face,
        pay,
        introduction,
        detail
    };

    try {
        await LogInCollection.create(data);
        res.status(201).render("home", { naming: `${name}` });
    } catch (error) {
        console.error("강사 회원가입 오류:", error);
        res.status(500).send("회원가입에 실패했습니다.");
    }
});



// 로그인 처리
app.post("/login", async (req, res) => {
    const { id, password } = req.body;

    try {
        const user = await LogInCollection.findOne({ id });

        if (user && user.password === password) {
            res.status(201).render("home", { naming: `${user.name}`, role: user.role });
        } else {
            res.status(400).send("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    } catch (error) {
        console.error("로그인 오류:", error);
        res.status(500).send("로그인 중 오류가 발생했습니다.");
    }
});

app.listen(port, () => {
    console.log("서버가 실행되었습니다. 포트:", port);
});
