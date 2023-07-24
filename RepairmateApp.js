var express = require('express')
const mongoose = require('mongoose')
const mongoString = "mongodb+srv://repairmateadmin:3662@repairmate.dy9r1vc.mongodb.net/repairmates"

mongoose.connect(mongoString)
const db = mongoose.connection

db.on('error', (error) => {
   console.log(error)
})

db.once('connected', () => {
   console.log('Database Connected')
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

const mechanicModel = mongoose.model('Mechanics', mechanic)

var app = express()
var fs = require("fs")
var bodyParser = require('body-parser')
app.use( bodyParser.json() )       
app.use(bodyParser.urlencoded({     
  extended: true
}))

app.get("/garages", async function (req, res) {
   var data = await mechanicModel.find({})
   const garages = {list:data}
   res.json(garages)
})


app.post("/addGarage", async function (req, res) {
   await mechanicModel.create({
      name : req.body["name"],
      email : req.body["email"],
      phone_no : req.body["phone_no"],
      location : req.body["location"],
      availability : req.body["availability"]
   })
   res.redirect("/garages")
 })

 app.post("/edit", async function (req, res) {
   try {
      const updatedMechanic = await mechanicModel.updateOne(
         { email: req.body["oldEmail"] },
         {
            name: req.body["name"],
            email: req.body["email"],
            phone_no: req.body["phone_no"],
            location: req.body["location"]
         }
      )

      res.redirect("/garages");
   } catch (error) {
      console.error("Error while updating mechanic:", error)
      res.status(500).send("Internal Server Error")
   }
});


app.listen(8080, function () {
})