// Import dependencies
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const fs = require("fs");
const cors = require("cors");

// Initialize server
const app = express();
const server = http.createServer(app);
const io = socket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Chat data storage
let chatData = {};

// Read chat data from file
function loadChatData() {
  if (fs.existsSync("./chatData.json")) {
    chatData = JSON.parse(fs.readFileSync("./chatData.json", "utf-8"));
  }
}

// Save chat data to file
function saveChatData() {
  fs.writeFileSync("./chatData.json", JSON.stringify(chatData, null, 2));
}

// Load chat data on server start
loadChatData();

// REST API to fetch chat messages
app.get("/chat/:id1/:id2", (req, res) => {
  const { id1, id2 } = req.params;
  const roomId = [id1, id2].sort().join("-");
  console.log(`Fetching messages for roomId: ${roomId}`);

  try {
    const messages = chatData[roomId] || [];
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// REST API to send a new chat message
app.post("/chat/:id1/:id2", (req, res) => {
  const { id1, id2 } = req.params;
  const roomId = [id1, id2].sort().join("-");
  const { text, sender, timestamp } = req.body;

  if (!chatData[roomId]) {
    chatData[roomId] = [];
  }

  const message = { text, sender, timestamp };
  chatData[roomId].push(message);
  saveChatData();

  io.to(roomId).emit("newMessage", message);
  res.status(200).json({ message: "Message sent", message });
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ id1, id2 }) => {
    const roomId = [id1, id2].sort().join("-");
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("sendMessage", ({ id1, id2, text, sender, timestamp }) => {
    const roomId = [id1, id2].sort().join("-");
    const message = { text, sender, timestamp };

    console.log(`Message received from ${sender} in room: ${roomId}`, message);

    if (!chatData[roomId]) {
      chatData[roomId] = [];
    }

    chatData[roomId].push(message);
    saveChatData();

    io.to(roomId).emit("newMessage", message);
    console.log(`Message sent to room: ${roomId}`, message);
  });





  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
