var express = require('express')
const mongoose = require('mongoose')
const mongoString = "mongodb+srv://repairmateadmin:3662@repairmate.dy9r1vc.mongodb.net/repairmates"

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
   console.log(error)
})

db.once('connected', () => {
   console.log('Database Connected');
})

const mechanic = new mongoose.Schema({
   name: {
     type: String,
     required: true,
   },
   email: {
     type: String,
     required: true,
   },
   phone_no: {
     type: String,
     required: true,
   },
   location: {
      type: String,
      required: true,
    },
    availability: {
     type: String,
     required: true,
   }
 })

 const mechanicModel = mongoose.model('Mechanics', mechanic);

var app = express()
var fs = require("fs")
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.get("/garages", function (req, res) {
   mechanicModel.find({}).then(data => {
      const garages = {list:data}
      res.json(garages)
   }).catch(error => {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' });
   })
})


app.post("/addGarage", async function (req, res) {
   const newMechanic = new mechanicModel({
      name : req.body["name"],
      email : req.body["email"],
      phone_no : req.body["phone_no"],
      location : req.body["location"],
      availability : req.body["availability"]
   })
   newMechanic.save()
   res.redirect("/garages")
 })

app.listen(8080, function () {
})