const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  
 let db_connect = dbo.getDb("React");
 db_connect
   .collection("Task")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("Task")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   text: req.body.text,
   day: req.body.day,
   reminder: req.body.reminder,
 };
 db_connect.collection("Task").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     text: req.body.text,
     day: req.body.day,
     reminder: req.body.reminder,
   },
 };
 db_connect
   .collection("Task")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("Task").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});





// This section will help you get a list of all the champions.
recordRoutes.route("/champions").get(function (req, res) {
  
  let db_connect = dbo.getDb("React");
  db_connect
    .collection("Champions")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
  
 // This section will help you get a single champion by id
 recordRoutes.route("/champions/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("Champions")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
  
 // This section will help you create a new Champion.
//  recordRoutes.route("/champions/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     text: req.body.text,
//     day: req.body.day,
//     reminder: req.body.reminder,
//   };
//   db_connect.collection("Task").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
//  });
  
 // This section will help you update a record by id.
 recordRoutes.route("/update/champions/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      ID: req.body.id,
      Name: req.body.name,
      Games: req.body.games,
      KDA: req.body.KDA,
      WinRate: req.body.winrate,
      PickRate: req.body.pickrate,
      Tier: req.body.tier
    },
  };
  db_connect
    .collection("Champions")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });
  
 // This section will help you delete a record
 recordRoutes.route("/champions/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Champions").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });
 
module.exports = recordRoutes;