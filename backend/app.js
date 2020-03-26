const express = require('express');
const app = express();
const port = 5000;
var router = express.Router;
var MongoClient = require('mongodb').MongoClient;

/// Create Database ********
// var url = "mongodb://localhost:27017/survey_db";
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });

/// Create Collection in Database ********
// var url = "mongodb://localhost:27017/";
// MongoClient.connect(url, function(err, db){
//     if (err) throw err;
//     var dbo = db.db("survey_db");
//     dbo.createCollection("survey_data", function(err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });

/// Insert data to Database ********
// var url = "mongodb://localhost:27017/";
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("survey_db");
//   var myobj = [
//     { question: 'How often do you eat meat and dairy?', options: [`Daily`, `1 or 2 times`, `3+ times per week`, `Not at all`]},
//     { question: 'How big are your portions sizes?', options: [`Smaller than average`, `Average`, `Larger than average`, `I'm not sure`]},
//     { question: 'How much food ends up wasted in your household?', options: [`None`, `1-5 plates per week`, `6-10 plates per week`, `More than 10 plates per week`]},
//     { question: 'How often do you eat avocados, asparagus, kiwi fruit or pineapples?', options: [`Daily`, `1 or 2 times`, `3+ times per week`, `Not at all`]},
//     { question: 'How often do you eat seasonal veg from Europe?', options: [`Daily`, `3+ times per week`, `1 or 2 times`, `Not at all`]}
//   ];
//   dbo.collection("survey_data").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of documents inserted: " + res.insertedCount);
//     db.close();
//   });
// });

/// Get (find) data from Database ********
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("survey_db");
  dbo.collection("survey_data").find({}).toArray(function(err, result) {
    if (err) throw err;
    app.get('/surveyQuestions', (req, res) => res.send(result));
    db.close();
  });
});

app.listen(port, () => console.log(`Backend is listening on port ${port}!`));