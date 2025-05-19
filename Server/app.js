// Library Imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserRoles,
} = require("./API/ManageUsers");
const {
  authUser,
  getUser,
  changePassword,
  authenticateToken,
} = require("./API/Users");
const {
  getMachines,
  getLocations,
  addMachine,
  deleteMachine,
  updateMachine,
} = require("./API/ManageMachines");
require("dotenv").config();

// Create an express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// Get all roles
app.get("/user-roles", async (req, res) => {
  await getUserRoles(res);
});

// Get all locations
app.get("/locations", async (req, res) => {
  await getLocations(res);
});

// Manage Users API
// Get all users
app.get("/users", async (req, res) => {
  await getUsers(res);
});

// Add a new user
app.post("/users", async (req, res) => {
  await addUser(req, res);
});

// Update an existing user
app.put("/users/:id", async (req, res) => {
  await updateUser(req, res);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  await deleteUser(req, res);
});

// Managing machines API
// Get all machines
app.get("/machines", async (req, res) => {
  await getMachines(res);
});

// Add a new machine
app.post("/machines", async (req, res) => {
  await addMachine(req, res);
});

// Update an existing machine
app.put("/machines/:id", async (req, res) => {
  await updateMachine(req, res);
});

// Delete a user
app.delete("/machines/:id", async (req, res) => {
  await deleteMachine(req, res);
});

// Authentication of User API
// Auth User
app.post("/login", async (req, res) => {
  await authUser(req, res);
});

// Change Password
app.post("/changePassword", async (req, res) => {
  await changePassword(req, res);
});

// Get Existing User
app.post("/getUser", authenticateToken, async (req, res) => {
  await getUser(req, res);
});

// Production Report API
// Recieve Production Report
app.post("/production-report", express.json(), (req, res) => {
  const report = req.body;
  console.log("Received report:", report);

  // TODO: Save to database
  res.status(200).json({ message: "Report received successfully" });
});

module.exports = app;
