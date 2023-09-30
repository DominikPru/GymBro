const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uri =
  "mongodb+srv://fancy:Kocicka123@gymbro.33d0low.mongodb.net/?retryWrites=true&w=majority";
const dbName = "Main";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbName, // Specify the database name here
});

app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.json());

// Schema for Users
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
});

// Create UserModel
const UserModel = mongoose.model("User", userSchema);

//Hashes user password
async function hashPass(pass) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Salt: ", salt);
    const hash = await bcrypt.hash(pass, salt);
    console.log("Hash: ", hash);
    return hash;
  } catch (err) {
    console.error(err.message);
    throw err; // Rethrow the error for handling elsewhere if needed
  }
}

//Validates user through comparing the hashed pass in db and plain string pass
async function validateUser(hash, pass) {
  try {
    const res = await bcrypt.compare(pass, hash);
    console.log(res); // Should return true or false
    return res;
  } catch (err) {
    console.error(err.message);
    throw err; // Rethrow the error for handling elsewhere if needed
  }
}

//Insert a new user to the database, called when registering
async function insertRegister(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.Email });
    const existingName = await UserModel.findOne({ username: req.body.Name });

    if (existingUser || existingName) {
      res.send("Email or Username Already Registered");
    } else {
      const regUser = new UserModel({
        email: req.body.Email,
        password: await hashPass(req.body.Pass),
        username: req.body.Name,
      });
      await regUser.save();
      res.send("Registration Successful");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

//Check user login credentials
async function checkLogin(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.Email });

    if (existingUser) {
      if (await validateUser(existingUser.password, req.body.Pass)) {
        res.send("Auth Valid");
      } else {
        res.send("Password or Username incorrect");
      }
    } else {
      res.send("Password or Username incorrect");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

app.post("/register", (req, res) => {
  console.log(req.body.Email);
  insertRegister(req, res);
});

app.post("/login", (req, res) => {
  console.log(req.body.Email);
  checkLogin(req, res);
});

const listener = app.listen(8888, function () {
  console.log("Listening on port " + listener.address().port);
});
