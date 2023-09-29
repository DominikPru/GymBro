const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const uri = "mongodb+srv://fancy:Kocicka123@gymbro.33d0low.mongodb.net/?retryWrites=true&w=majority";
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
  username: String
});

// Create UserModel
const UserModel = mongoose.model('User', userSchema);

async function insertRegister(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.Email });

    if (existingUser) {
      res.send('User Already Registered');
    } else {
      const regUser = new UserModel({
        email: req.body.Email,
        password: req.body.Pass,
        username: req.body.Name
      });
      await regUser.save();
      res.send('Registration Successful');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

app.post('/register', (req, res) => {
  console.log(req.body.Email);
  insertRegister(req, res);
});

const listener = app.listen(8888, function () {
  console.log('Listening on port ' + listener.address().port);
});
