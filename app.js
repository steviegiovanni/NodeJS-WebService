var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const PORT = process.env.PORT || 3000

var app = express();

app.get('/',function(req, res){
	res.send('Hello world!');
});

app.listen(PORT, function(){
	console.log('Server started on port '+PORT);
});