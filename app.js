var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const PORT = process.env.PORT || 3000
var mongojs = require('mongojs')
var db = mongojs('mongodb://steviegiovanni:stevie241188@ds041671.mlab.com:41671/testapp',['userlogin']);

var app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req, res){
	res.send('Hello world!');
});

app.post('/users/login', function(req, res){
	var newUser = {
		username:req.body.username,
		password:req.body.password
	}

	db.userlogin.find(newUser,function(err, result){
		if(err){
			console.log(err);
		}
		if(result.length > 0)
			res.json({status:200,message:result});
		else	
			res.json({status:452,message:'username does not exist'});
	});
});

app.post('/users/signup',function(req,res){
	var newUser = {
		username:req.body.username
	}

	db.userlogin.find(newUser,function(err, result){
		if(err){
			console.log(err);
		}
		
		if(result.length > 0)
			res.json({status:452,message:'username is taken'});
		else{
			newUser.password = req.body.password;
			db.userlogin.insert(newUser, function(err2,result2){
				if(err){
					console.log(err2);
				}

				res.json({status:200,message:'OK'});
			});
		}
	});
});

app.listen(PORT, function(){
	console.log('Server started on port '+PORT);
});