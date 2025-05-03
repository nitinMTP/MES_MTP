const { default: mongoose } = require("mongoose");
const UserSchema = require("../Schema/UserSchema");
const bcrypt = require("bcryptjs");
const UserRolesSchema = require("../Schema/UserRolesSchema");
require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/";
console.log("uri", process.env.MONGO_URI);
const dbName = process.env.MONGO_DB || "MES";

async function getUsers(res) {
  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const UserRoles = dB.model("UserRoles", UserRolesSchema);
    const User = dB.model("Users", UserSchema);

    const rows = await User.find({}, { password: 0 })
      .populate("role")
      .populate("lastChanged");
    await MongooseConnection.close();
    res.json(rows);
  } catch (error) {
    console.log("Error : ", error);

    res.status(500).json({ message: "Error retrieving rows", error });
  }
}

async function getUserRoles(res) {
  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const UserRoles = dB.model("UserRoles", UserRolesSchema);

    const rows = await UserRoles.find({});
    await MongooseConnection.close();
    res.json(rows);
  } catch (error) {
    await MongooseConnection.close();
    res.status(500).json({ message: "Error retrieving roles", error });
  }
}

async function addUser(req, res) {
  console.log("req", req.body);

  try {
    console.log("Inside Add user");

    const MongooseConnection = await mongoose.createConnection(uri, (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
        console.log("Connected to database!!!!!!");
      }
    });
    const dB = await MongooseConnection.useDb(dbName);
    const User = await dB.model("Users", UserSchema);

    const { name, email, role, password, lastChanged } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedpass", hashedPassword);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      lastChanged,
    });
    await newUser.save();
    await MongooseConnection.close();
    await res.status(201).send({ user: newUser, success: true });
  } catch (error) {
    // await MongooseConnection.close();
    console.log("error : ", error);

    await res
      .status(500)
      .json({ message: "Error adding row", error, success: false });
  }
}
async function updateUser(req, res) {
  const { id } = req.params;
  var { name, email, role, password, lastChanged } = req.body;
  password = password ? password.trim() : null;
  console.log("Password : ", { password });

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
    var updatedUser = false;
    if (password === null || password === "" || password === undefined) {
      updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, role, lastChanged },
        {
          new: true,
        }
      );
    } else {
      console.log("Updating Password as well");
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, role, password: hashedPassword, lastChanged },
        {
          new: true,
        }
      );
    }
    if (updatedUser) {
      res.json({ user: updatedUser, success: true });
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
async function deleteUser(req, res) {
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
    const User = dB.model("Users", UserSchema);
    const result = await User.findByIdAndDelete(id);
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

module.exports = { getUsers, getUserRoles, addUser, updateUser, deleteUser };
