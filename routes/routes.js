var express = require('express');
var router = express.Router();
var client = require('../db/index');

module.exports = function(){
	
	router.get('/:username', function(req, res, next){
		var user = req.params.username;
		client.connect(function(err, conn){
		    if(err){
		      return res.send(err);
		    }
		    conn.query('select tweets.content, tweets.id from tweets join users on users.id = tweets.userid where users.name = $1', [user], function(err, result){
		      if(err){
		        return res.send(err);
		      }
		      res.render('index', { tweets: result.rows });
		    });
	    });

	});

	return router;
}