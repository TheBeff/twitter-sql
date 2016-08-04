var express = require('express');
var router = express.Router();
var client = require('../db/index');
var bodyParser = require('body-parser');

module.exports = function(){
	
	router.get('/:tweetid', function(req, res, next){
		var tweetid = req.params.tweetid;
		client.connect(function(err, conn){
		    if(err){
		      return res.send(err);
		    }
		    conn.query('select tweets.content from tweets join users on users.id = tweets.userid where tweets.id = $1', [tweetid], function(err, result){
		      if(err){
		        return res.send(err);
		      }
		      res.render('index', { tweets: result.rows, foo: true });
		    });
	    });

	});

	router.post('/', function(req, res, next){
		console.log(req.body.name);
		var user = req.body.name;
		var newTweet = req.body.text;
		console.log(newTweet);
		client.connect(function(err, conn){
		    if(err){
		      return res.send(err);
		    }
		    conn.query('INSERT into tweets (userid, content) VALUES ($1, $2) RETURNING id', [user, newTweet], function(err, result){
		      if(err){
		        return res.send(err);
		      }
		      res.render('index', { tweets: result.rows});
		    });
	    });
	});

	return router;
}