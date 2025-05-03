const { default: mongoose } = require("mongoose");
const UserSchema = require("../Schema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRolesSchema = require("../Schema/UserRolesSchema");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/";
console.log("uri", process.env.MONGO_URI);
const dbName = process.env.MONGO_DB || "MES";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

async function authUser(req, res) {
  const { email, password } = req.body;
  var loginSuccess = false;
  var oldPassValidation = false;
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

    const user = await User.findOne({ email: email }).populate("role");
    if (user) {
      const loginData = user._doc;
      console.log("Found User : ", loginData);
      const passwordCorrect = await bcrypt.compare(
        password,
        loginData.password
      );
      console.log("Password Correct Variable : ", passwordCorrect);

      loginSuccess = passwordCorrect;
      if (!loginSuccess) {
        res.json({
          message: "Login Unsuccessful",
          loginSuccess: loginSuccess,
          user: {},
        });
      } else {
        const { password, ...tokenInfo } = user._doc;
        const token = jwt.sign(tokenInfo, JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({ loginSuccess, user: loginSuccess && user, token });
      }
    } else {
      console.log("No User found");
      loginSuccess = false;
      res.json({ loginSuccess: loginSuccess, user: {} });
    }
    await MongooseConnection.close();
  } catch (error) {
    console.log("Error : ", error);

    res.json({
      loginSuccess: loginSuccess,
      message: "Error retrieving rows",
      error,
    });
  }
}

async function changePassword(req, res) {
  const { _id, currentPassword, newPassword } = req.body;
  var userFound = false;
  var passwordChanged = false;
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

    const user = await User.findById(_id);
    console.log("Found User id : ", JSON.parse(JSON.stringify(user)));
    if (user) {
      const userData = user._doc;
      console.log("User Available");

      // oldPassValidation = userData.password === currentPassword;
      oldPassValidation = await bcrypt.compare(
        currentPassword,
        userData.password
      );
    } else {
      console.log("Password Change Failed");
      userFound = false;
    }
    if (oldPassValidation) {
      // Set up update password query
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);
      var passUpdate = await User.findOneAndUpdate(
        { _id: _id },
        { password: hashPassword }
      ).exec();
      if (passUpdate) {
        // console.log(passUpdate);
        console.log("Changed Password Successfully");
        passwordChanged = true;
      } else {
        console.log("Failed To Update Password");
        passwordChanged = false;
      }
    } else {
      console.log("Password Does Not match");
      passwordChanged = false;
    }

    res.json({ passwordChanged: passwordChanged, _id });

    await MongooseConnection.close();
  } catch (error) {
    console.log("Error Fetching Data : ", error);

    res.json({
      passwordChanged: false,
      _id: _id,
      message: "Error retrieving rows",
      error,
    });
  }
}

async function getUser(req, res) {
  const { _id, token } = req.body;
  var userFound = false;
  try {
    const MongooseConnection = mongoose.createConnection(uri, async (err) => {
      if (err) {
        console.log("Error connecting to database : ", err);
      } else {
      }
    });
    const dB = MongooseConnection.useDb(dbName);
    const UserRoles = dB.model("UserRoles", UserRolesSchema);
    const User = dB.model("Users", UserSchema);

    const user = await User.findById(_id, { password: 0 }).populate("role");
    console.log(user);
    if (user) {
      userFound = true;
    } else {
      console.log("No user found");
      userFound = false;
    }
    await MongooseConnection.close();
    res.json({ userFound: userFound, user: user });
  } catch (error) {
    console.log("Error : ", error);

    res.json({
      userFound: false,
      user: {},
      message: "Error retrieving user",
      error,
    });
  }
}

function authenticateToken(req, res, next) {
  console.log("Inside Authenticate Token");
  console.log("Headers : ", req);

  const authHeader = req.headers["authorization"];
  const token = req.body.token;
  console.log("Token : ", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authUser, changePassword, getUser, authenticateToken };
