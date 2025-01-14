const express = require('express');
const http = require('http');
const socket = require('socket.io');
const fs = require('fs');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socket(server);

// Middleware
app.use(cors());
app.use(express.json());

// 유저별 채팅 데이터
let chatData = {}; // { "학생": { "선생님": [ ...messages ] } }

// 채팅 데이터 읽기/저장
function saveChatData() {
    fs.writeFileSync('./chatData.json', JSON.stringify(chatData, null, 2));
}

function loadChatData() {
    if (fs.existsSync('./chatData.json')) {
        chatData = JSON.parse(fs.readFileSync('./chatData.json'));
    }
}
loadChatData();

io.on('connection', (socket) => {
    console.log("새로운 유저가 연결되었습니다.");

    // 새 사용자 접속 처리
    socket.on('newUser', (username) => {
        socket.username = username;

        if (!chatData[username]) chatData[username] = {}; // 사용자 데이터 초기화

        // 사용자 목록 전송
        socket.emit('userList', Object.keys(chatData[username]));
    });

    // 특정 사용자와의 채팅 불러오기
    socket.on('loadChat', (otherUser) => {
        const userChats = chatData[socket.username]?.[otherUser] || [];
        socket.emit('chatHistory', userChats);
    });

    // 메시지 전송 처리
    socket.on('message', ({ to, message }) => {
        const timestamp = new Date().toISOString();

        // 채팅 데이터 저장
        if (!chatData[socket.username][to]) chatData[socket.username][to] = [];
        if (!chatData[to][socket.username]) chatData[to][socket.username] = [];

        const newMessage = { message, timestamp, from: socket.username };

        chatData[socket.username][to].push(newMessage);
        chatData[to][socket.username].push(newMessage);

        saveChatData();

        // 상대방에게 메시지 전송
        socket.broadcast.emit('updateChat', newMessage);
    });
});

server.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000");
});
