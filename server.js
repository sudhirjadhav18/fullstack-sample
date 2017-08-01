
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));

app.post("/loginuser", function(req, res) {
	console.log(req);
	res.end("1");
});

app.get("/*", function(req, res) {
	res.sendFile(__dirname + "/app/index.html");
});

var port = 8080;
app.listen(port, function() {
	console.log("App live at port: " + port);
	//console.log("dir Path: " + __dirname); 
});