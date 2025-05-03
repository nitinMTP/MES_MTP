var mongoose = require("mongoose");

// Define User Schema
const MachinesSchema = new mongoose.Schema(
  {
    machine: String,
    name: String,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Locations" },
    lastChanged: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { collection: "Machines" }
);

module.exports = MachinesSchema;
