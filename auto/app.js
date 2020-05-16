/**
 *Intelectual property of Eleven Mobile
 * @author Stefan Valeanu
 */
const express = require('express')
var path = require('path'); 

const app = express()
const port = 3000
//de schimabt cu 80


const fs = require('fs');
var obj = require('./public/javascripts/quiz.json')

//style
app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/stylesheets/style.css'));
});

//index
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

//hidden scripts
app.get('/google_style', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/javascripts/test.js'));
});
app.get('/unzip', function(req, res) {
  
  res.json(obj);
});
app.get('/favicon.png', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/images/favicon.png'));
});
app.get('/bg.jpg', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/images/bg.jpg'));
});
app.get('/bg2.jpg', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/images/bg2.jpg'));
});
app.get('/pdf', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/images/prezentare.pdf'));
});
//test page
app.get("/test?:code", async function(req,res) {
	var code = req.query.code;

		try {
      if(code === "codCursant"){
        res.sendFile(path.join(__dirname + '/views/test.html'));
      }else{
        res.status(400);
				res.json({"message": "Wrong code"});
      }
		} catch (err) {
			if(err.message == "Not found") {
				res.status(404);
				res.json({"message": "Not found"});
				return;
			} else {
				res.status(400);
				res.json({"message": err.message});
				return;
			}
		}
	});



app.listen(port, () => console.log(`Listening on port ${port}!`))
