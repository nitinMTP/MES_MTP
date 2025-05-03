var mongoose = require("mongoose");

// Define User Roles Schema
const UserRolesSchema = new mongoose.Schema(
  {
    name: String,
    access: Object,
  },
  { collection: "UserRoles" }
);

module.exports = UserRolesSchema;
