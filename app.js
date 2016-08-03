var express = require('express');
var db = require('./db/index');
var swig = require('swig');
swig.setDefaults({ cache: false});
var path = require('path');

var app = express();
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

module.exports = app;

app.use(express.static(path.join(__dirname, '/node_modules')));

// app.get('/', function(req, res, next){
// 	res.render('index', { title: 'Home'});
// });

app.get('/', function(req, res, next){
  db.connect(function(err, conn){
    if(err){
      return res.send(err);
    }
    conn.query('select tweets.content, users.name from tweets join users on users.id = tweets.userid', [], function(err, result){
      if(err){
        return res.send(err);
      }
      res.render('index', { tweets: result.rows });
    });

  });
});
