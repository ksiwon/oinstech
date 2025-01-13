const express = require('express');
const socket = require('socket.io');    
const http = require('http');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get('/', function(req, res){
    fs.readFile('./client/index.html', function(error, data){
        if(error){
            res.send('에러');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

// 새로운 유저 연결 처리
io.on('connection', function(socket){
    console.log("새로운 유저가 입장했습니다.");

    // 유저가 접속했을 때
    socket.on('newUser', function(name){
        socket.name = name;
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: `${name}님이 접속하였습니다.`});
    });

    // 메시지 전송 처리
    socket.on('message', function(data){
        data.name = socket.name;
        console.log(data);
        socket.broadcast.emit('update', data);
    });

    // 유저가 나갔을 때
    socket.on('disconnect', function(){
        console.log(`${socket.name}님이 나가셨습니다.`);
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: `${socket.name}님이 나가셨습니다.`});
    });
});

// 서버 실행
server.listen(3000, function(){
    console.log('서버 실행 중: http://localhost:3000');
});
