
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

// Example route
// var user = require('./routes/user');
var index = require('./routes/index');
var read = require('./routes/read');
var list = require('./routes/list');
var add = require('./routes/add');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/read', read.view);
app.get('/list', list.view);
app.get('/addNote', add.note); 
app.get('/addDefn', add.defn);
app.get('/addHighlight', add.highlight); // HEREEEE
app.get('/deleteNote', add.delNote);
app.get('/editNote', add.editNote);
app.get('/deleteHighlight', add.delHi);
app.get('/editHighlight', add.editHi);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
