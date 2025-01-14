const express = require("express");
const {Student} = require("./mongo_student");
const {Teacher} = require("./mongo_teacher");
 

const app = express();
app.use(express.json());

// Helper function to extract data between tags
function midReturn(startTag, endTag, source) {
    const startIndex = source.indexOf(startTag);
    const endIndex = source.indexOf(endTag, startIndex);
    return startIndex !== -1 && endIndex !== -1
        ? source.substring(startIndex + startTag.length, endIndex).trim()
        : "";
}

// Helper function to extract multiple elements between tags
function multipleMidReturn(startTag, endTag, source) {
    const results = [];
    let startIndex = source.indexOf(startTag);

    while (startIndex !== -1) {
        const endIndex = source.indexOf(endTag, startIndex);
        if (endIndex !== -1) {
            results.push(source.substring(startIndex + startTag.length, endIndex).trim());
            startIndex = source.indexOf(startTag, endIndex);
        } else {
            break;
        }
    }
    return results;
}

// Default route for root
app.get("/", (req, res) => {
    res.send("Welcome to the Everytime Timetable API! Use the endpoint /api/everytime/timetable to fetch timetable data.");
});

// Puppeteer function to log in and fetch timetable HTML
async function fetchTimetableHtml(username, password) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto("https://everytime.kr/", { waitUntil: "networkidle2" });

        // Login process
        await page.type("input[name='userid']", username);
        await page.type("input[name='password']", password);
        await page.click(".submit");

        await page.waitForNavigation({ waitUntil: "networkidle2" });

        // Navigate to the timetable page
        await page.goto("https://everytime.kr/timetable", { waitUntil: "networkidle2" });

        // Extract timetable HTML
        const html = await page.content();

        await browser.close();
        return html;
    } catch (error) {
        await browser.close();
        throw new Error("Failed to fetch timetable: " + error.message);
    }
}


// Match teachers based on student preferences
app.get("/api/match-teachers/:studentId", async (req, res) => {
    const { studentId } = req.params;

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

        const matchingTeachers = await Teacher.find({
            gender: { $in: prefered_gender },
            university: { $in: prefered_school },
            personality: { $in: prefered_personality },
            subject: { $in: subject },
            tendency: { $in: prefered_tendency },
            location: { $in: location },
            pay: { $lte: payWant },
        });

        res.status(200).json(matchingTeachers);
    } catch (error) {
        console.error("Error matching teachers:", error);
        res.status(500).json({ message: "Error matching teachers.", error });
    }
});

// Match students based on teacher preferences
app.get("/api/match-students/:teacherId", async (req, res) => {
    const { teacherId } = req.params;

    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "강사 정보를 찾을 수 없습니다." });
        }

        const {
            prefered_gender,
            prefered_school,
            prefered_personality,
            subject,
            prefered_gradeHighschool,
            location,
        } = teacher;

        const matchingStudents = await Student.find({
            gender: { $in: prefered_gender },
            school: { $in: prefered_school },
            prefered_personality: { $in: prefered_personality },
            subject: { $in: subject },
            gradeHighschool: { $in: prefered_gradeHighschool },
            location: { $in: location },
        });

        res.status(200).json(matchingStudents);
    } catch (error) {
        console.error("Error matching students:", error);
        res.status(500).json({ message: "Error matching students.", error });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
