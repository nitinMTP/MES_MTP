const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");
const uuidv4 = require("uuid").v4;

// Project Imports
const app = require("./app");
const port = 8000;

//Create a server app
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const wsServer = new WebSocketServer({ server });

// Maintaining all active connections in this object
const clients = {};

function handleDisconnect(userId) {
  console.log(`${userId} disconnected.`);
  delete clients[userId];
}

// A new client connection request received
wsServer.on("connection", function (connection) {
  // Generate a unique code for every user
  const userId = uuidv4();
  // Store the new connection and handle messages
  clients[userId] = connection;
  console.log(`${userId} connected.`);
  // User disconnected
  connection.on("close", () => handleDisconnect(userId));
});
