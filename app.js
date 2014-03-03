
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

// Example route
// var user = require('./routes/user');
var index = require('./routes/index');
var read = require('./routes/read');
var summary = require('./routes/summary');
var add = require('./routes/add');
var data = require('./routes/data');
var login = require('./routes/login');

var local_database_name = 'paperworm';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

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
app.get('/', login.view);
app.get('/index', index.view);
app.get('/login', login.view);
app.get('/loginAfter', login.after);
app.get('/logout', login.out);
app.get('/read/:paper', read.view);
app.get('/readAlt/:paper', read.viewAlt);
app.get('/summary/:paper', summary.view);

app.get('/addNote/:paper', add.note);
app.get('/deleteNote/:paper', add.delNote);
app.get('/editNote/:paper', add.editNote);

app.get('/addHighlight/:paper', add.highlight);
app.get('/deleteHighlight/:paper', add.delHi);
app.get('/editHighlight/:paper', add.editHi);

//app.get('/addDefn/:paper', add.defn);
app.get('/deleteDefinition/:paper', add.delDef);
app.get('/editDefinition/:paper', add.editDef);

app.get('/serializedString/:paper', data.serializedString);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
