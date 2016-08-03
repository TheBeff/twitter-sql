var express = require('express');
var swig = require('swig');
swig.setDefaults({ cache: false});
var path = require('path');

var app = express();

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function(req, res, next){
	res.render('index');
});

app.listen(process.env.PORT); 