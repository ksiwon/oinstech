// // 필요한 패키지 설치: yarn add express puppeteer
// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();
// const PORT = 3000;

// // 에브리타임에서 시간표 데이터 가져오기
// async function fetchTimetable() {
//     const loginUrl = 'https://account.everytime.kr/login';
//     const timetableUrl = 'https://everytime.kr/timetable';

//     try {
//         const browser = await puppeteer.launch({ headless: true }); // headless: true는 브라우저가 보이지 않도록 실행
//         const page = await browser.newPage();

//         // 1. 로그인 페이지로 이동
//         await page.goto(loginUrl, { waitUntil: 'networkidle2' });

//         // 2. 로그인 폼 입력
//         await page.type('#userid', 'your_id'); // 에브리타임 ID 입력
//         await page.type('#password', 'your_password'); // 에브리타임 비밀번호 입력
//         await page.click('input[type="submit"]'); // 로그인 버튼 클릭

//         // 3. 로그인 후 시간표 페이지로 이동
//         await page.waitForNavigation();
//         await page.goto(timetableUrl, { waitUntil: 'networkidle2' });

//         // 4. 페이지 HTML 가져오기
//         const pageContent = await page.content();

//         // 브라우저 닫기
//         await browser.close();

//         // HTML 반환
//         return pageContent;
//     } catch (error) {
//         console.error('Error fetching timetable:', error.message);
//         return null;
//     }
// }

// // `/api/everytime/timetable` 엔드포인트 추가
// app.get('/api/everytime/timetable', async (req, res) => {
//     const timetableHtml = await fetchTimetable();

//     if (!timetableHtml) {
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to fetch timetable',
//         });
//     }

//     res.status(200).json({
//         success: true,
//         message: 'Timetable fetched successfully',
//         html: timetableHtml, // 시간표 HTML 반환
//     });
// });

// // 기본 엔드포인트
// app.get('/', (req, res) => {
//     res.send('에브리타임 시간표 API가 실행 중입니다. /api/everytime/timetable로 이동하세요.');
// });

// // 서버 실행
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// 필요한 패키지를 설치합니다
// npm install express puppeteer
// 먼저 axios를 설치하세요:
// npm install axios

const axios = require('axios');

// 예시: 로그인 요청
const login = async (username, password) => {
  try {
    const response = await axios.post('https://everytime.kr/api/login', {
      username: username,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
  }
};

// 예시: 게시물 가져오기
const getPosts = async (authToken) => {
  try {
    const response = await axios.get('https://everytime.kr/api/posts', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('게시물 가져오는 중 오류 발생:', error);
  }
};

// 사용 예시
(async () => {
  const username = 'your_username';
  const password = 'your_password';
  
  // 로그인하여 토큰 받기
  const loginData = await login(username, password);
  const authToken = loginData.token; // 실제 응답 구조에 맞게 수정 필요
  
  // 토큰을 사용하여 게시물 가져오기
  const posts = await getPosts(authToken);
  console.log(posts);
})();
