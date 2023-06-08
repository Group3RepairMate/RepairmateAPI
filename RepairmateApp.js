var express = require('express')
var app = express()
var fs = require("fs")

var id = 2
var user = {
       "name" : "A one service",
       "email" : "aone@gmail.com",
       "phone_no" : "6578909876",
       "location" : "160,Canon Jackson Dr",
       "availability" : "both"
}


app.get("/garages", function (req, res) {
   fs.readFile("garages.json", 'utf8', function (err, data) {
      data = JSON.parse(data)
      for(let i=0;i<data["list"].length;i++){
         if(data["list"].length==1){
            if(data["list"][i]===null){
               data["list"]=[]
            }
         }
      }
      fs.writeFile("garages.json",JSON.stringify(data),function(err){})
      res.end( JSON.stringify(data) )
   })
})

app.get("/addGarage/:garage", function (req, res) {
    fs.readFile("garages.json", 'utf8', function (err, data) {
       data = JSON.parse(data)
       model = JSON.parse(req.params.garage)
       model["id"] = data["list"].length + 1
       data["list"].push(model)
       fs.writeFile("garages.json",JSON.stringify(data),function(err){})
       res.redirect("/garages")
    })
 })

 app.get('/deleteGarage/:id', function (req, res) {
    fs.readFile("garages.json", 'utf8', function (err, data) {
       data = JSON.parse( data )
       for(let i=0;i<data["list"].length;i++){
         if(data["list"][i]["id"]==req.params.id){
            delete data["list"][i]
         }
       }
       fs.writeFile("garages.json",JSON.stringify(data),function(err){})
       res.redirect("/garages")
    })
 })

app.listen(8080, function () {
})