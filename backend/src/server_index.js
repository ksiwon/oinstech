const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Update this to your front-end URL
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

// Sample in-memory storage for chat messages (use a real database in production)
const chats = {};

// REST API to get chat messages between two users
app.get('/chat/:userId/:partnerId', (req, res) => {
  const { userId, partnerId } = req.params;
  const roomId = [userId, partnerId].sort().join('-');
  
  // Retrieve messages from memory (or database)
  if (!chats[roomId]) {
    chats[roomId] = [];
  }
  
  res.json(chats[roomId]);
});

// REST API to send a new chat message
app.post('/chat/:userId/:partnerId', (req, res) => {
  const { userId, partnerId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const roomId = [userId, partnerId].sort().join('-');
  const message = { text, sender: userId, timestamp: new Date().toISOString() };

  // Save message in memory (or database)
  if (!chats[roomId]) {
    chats[roomId] = [];
  }
  
  chats[roomId].push(message);

  // Emit message to WebSocket clients
  io.to(roomId).emit('newMessage', message);

  res.status(200).json(message);
});

// WebSocket communication
io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for room joining
  socket.on('joinRoom', ({ id1, id2 }) => {
    const roomId = [id1, id2].sort().join('-');
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle new message event
  socket.on('sendMessage', ({ id1, id2, text, sender, timestamp }) => {
    const roomId = [id1, id2].sort().join('-');
    const message = { text, sender, timestamp };
    
    // Emit the message to the room
    io.to(roomId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
