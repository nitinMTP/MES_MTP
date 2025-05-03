var mongoose = require("mongoose");

// Define User Roles Schema
const LocationsSchema = new mongoose.Schema(
  {
    name: String,
  },
  { collection: "Locations" }
);

module.exports = LocationsSchema;
