const { default: mongoose } = require("mongoose");
const MachinesSchema = require("../Schema/MachinesSchema");
const UserSchema = require("../Schema/UserSchema");
const LocationsSchema = require("../Schema/LocationsSchema");

require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/";
console.log("uri", process.env.MONGO_URI);
const dbName = process.env.MONGO_DB || "MES";

async function getMachines(res) {
  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const User = dB.model("Users", UserSchema);
    const Locations = dB.model("Locations", LocationsSchema);
    const Machines = dB.model("Machines", MachinesSchema);

    const rows = await Machines.find({})
      .populate("location")
      .populate("lastChanged");
    await MongooseConnection.close();
    res.json(rows);
  } catch (error) {
    console.log("Error : ", error);

    res.status(500).json({ message: "Error retrieving rows", error });
  }
}

async function getLocations(res) {
  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const Locations = dB.model("UserRoles", LocationsSchema);

    const rows = await Locations.find({});
    await MongooseConnection.close();
    res.json(rows);
  } catch (error) {
    await MongooseConnection.close();
    res.status(500).json({ message: "Error retrieving locations", error });
  }
}

async function addMachine(req, res) {
  console.log("req", req.body);

  try {
    console.log("Inside Add Machine");

    const MongooseConnection = await mongoose.createConnection(uri, (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = await MongooseConnection.useDb(dbName);
    const Machines = await dB.model("Users", MachinesSchema);

    const { machine, name, location, lastChanged } = req.body;

    console.log(lastChanged);

    const newMachine = new Machines({
      machine,
      name,
      location,
      lastChanged,
    });
    await newMachine.save();
    await MongooseConnection.close();
    await res.status(201).send({ machine: newMachine, success: true });
  } catch (error) {
    // await MongooseConnection.close();
    console.log("error : ", error);

    await res
      .status(500)
      .json({ message: "Error adding row", error, success: false });
  }
}

async function updateMachine(req, res) {
  const { id } = req.params;
  var { name, machine, location, lastChanged } = req.body;

  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const Machine = dB.model("Users", MachinesSchema);

    var updatedMachine = await Machine.findByIdAndUpdate(
      id,
      { machine, name, location, lastChanged },
      {
        new: true,
      }
    );

    if (updatedMachine) {
      res.json({ user: updateMachine, success: true });
    } else {
      res.status(404).json({ message: "Row not found", success: false });
    }
  } catch (error) {
    console.log("error : ", error);

    res
      .status(500)
      .json({ message: "Error updating row", error, success: false });
  }
}

async function deleteMachine(req, res) {
  const { id } = req.params;
  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const Machine = dB.model("Users", MachinesSchema);
    const result = await Machine.findByIdAndDelete(id);
    if (result) {
      res.json({ message: "Row deleted", success: true });
    } else {
      res.status(404).json({ message: "Row not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting row", error, success: false });
  }
}

module.exports = {
  getMachines,
  getLocations,
  addMachine,
  updateMachine,
  deleteMachine,
};
