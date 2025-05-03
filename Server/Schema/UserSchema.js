var mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: "UserRoles" },
    password: String,
    lastChanged: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { collection: "Users" }
);

module.exports = UserSchema;
