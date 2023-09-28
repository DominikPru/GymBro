const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { Schema } = mongoose;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fancy:Kocicka123@gymbro.33d0low.mongodb.net/?retryWrites=true&w=majority";
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions)) // Use this after the variable declaration
//Schema for Users
const blogSchema = new Schema({
    email: String, 
    password: String,
    username: String,
    workout: [String]
  });

//Create Database Client
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

//Define listening port
var listener = app.listen(8888, function(){
    console.log('Listening on port ' + listener.address().port); 
});

async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

app.get('/', (req, res) => {
    run();
    res.json({name: "john doe"})
  })

  
app.post('/register', jsonParser, (req, res) => {
  console.log(req.body)
  res.send('Hello World!')
})