
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
var alt = require('./routes/alt'); //HERE

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
app.get('/readAlt/:paper', read.viewAlt); //HERE
app.get('/summary/:paper', summary.view);
app.get('/summaryAlt/:paper', summary.viewAlt); //HERE

app.post('/addNote/:paper', add.note);
app.get('/deleteNote/:paper', add.delNote);
app.get('/editNote/:paper', add.editNote);

app.get('/editSS/:paper', add.setSS);
app.post('/addHighlight/:paper', add.highlight);
app.get('/deleteHighlight/:paper', add.delHi);
app.get('/editHighlight/:paper', add.editHi);

//app.get('/addDefn/:paper', add.defn);
app.get('/deleteDefinition/:paper', add.delDef);
app.get('/editDefinition/:paper', add.editDef);

app.get('/serializedString/:paper', data.serializedString);

//HERE
app.get('/addNoteAlt/:paper', alt.note);
app.get('/deleteNoteAlt/:paper', alt.delNote);
app.get('/editNoteAlt/:paper', alt.editNote);

app.get('/editSSAlt/:paper', alt.setSS);
app.get('/addHighlightAlt/:paper', alt.highlight);
app.get('/deleteHighlightAlt/:paper', alt.delHi);
app.get('/editHighlightAlt/:paper', alt.editHi);

app.get('/deleteDefinitionAlt/:paper', alt.delDef);
app.get('/editDefinitionAlt/:paper', alt.editDef);
//HERE END

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
