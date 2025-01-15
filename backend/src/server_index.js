// Fetch chat messages
app.get("/chat/:userId/:partnerId", (req, res) => {
    const { userId, partnerId } = req.params;
    const roomId = [userId, partnerId].sort().join("-"); // Ensure consistent roomId

    try {
        const messages = chatData[roomId] || [];
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Send a new chat message
app.post("/chat/:userId/:partnerId", (req, res) => {
    const { userId, partnerId } = req.params;
    const { text, sender, timestamp } = req.body;
    const roomId = [userId, partnerId].sort().join("-"); // Ensure consistent roomId

    if (!chatData[roomId]) {
        chatData[roomId] = [];
    }

    const message = { text, sender, timestamp };
    chatData[roomId].push(message);
    saveChatData();

    // Notify participants in the chat room
    io.to(roomId).emit("updateChat", message);

    res.status(200).json({ message: "Message sent", message });
});

// WebSocket connection
io.on("connection", (socket) => {
    console.log("New client connected");

    // Join a specific chat room
    socket.on("joinRoom", ({ userId, partnerId }) => {
        const roomId = [userId, partnerId].sort().join("-"); // Ensure consistent roomId
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    // Handle sending messages via WebSocket
    socket.on("sendMessage", ({ userId, partnerId, text, timestamp }) => {
        const roomId = [userId, partnerId].sort().join("-"); // Ensure consistent roomId
        const message = { text, sender: userId, timestamp };

        if (!chatData[roomId]) {
            chatData[roomId] = [];
        }

        chatData[roomId].push(message);
        saveChatData();

        io.to(roomId).emit("newMessage", message); // Notify all participants
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
