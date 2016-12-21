var express = require('express');
var Request = require('request');
var bodyParser = require('body-parser');

var app = express();

// Set up the public directory to serve our Javascript file
app.use(express.static(__dirname + '/public'));
// Set EJS as templating language
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// GET - route to load the main page
app.get("/", function (request, response) {
	console.log("In main route");
	response.render('index.html', {title: "Notepad"});
});

// GET - Catch All route
app.get("*", function(request,response){
	response.redirect("/");
});
var port = process.env.PORT || 3000; 
app.listen(port);
console.log('Express started on port ' + port);