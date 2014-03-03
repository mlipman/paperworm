
var Mongoose = require('mongoose');

//v1: needs to add counter for note/highlight id
var PaperSchema = new Mongoose.Schema({
    "details" : {
        "name": String, 
        "title": String,
        "authors": String,
        "journal": String,
        "pubdate": Date,
        "pages": Number,
        "total-paragraphs": Number,
        "abstract":String,
        "citation": String,
        "figID": Number, //NEW
        "annotID": Number, //NEW 
        "dID": Number
    },
    "paragraphs": [{
        "pNumber": Number,
        "page": Number,
        "text": String,
        "images": [{
            "fig": String, //KEY
            "label": String,
            "src": String,
        }],
        "highlights":[{
            "iden": Number, //KEY
            "author": String, //TODO: link
            "hText": String,
            "nText": String,
            "pNumber": Number, //TODO: unnecessary
            "page": Number, 
            "hStart": Number,
            "hEnd": Number
        }],
        "notes": [{
            "iden": Number, //KEY
            "author": String, //TODO: link
            "body": String,
            "pNumber": Number, //TODO: unnecessary
            "page": Number
        }],
    }],
    "glossary":[{
        "dID": Number,
        "author": String, //TODO: link
        "word": String,
        "def": String
    }],
    "serializedString": String
});


/**
var PaperSchema = new Mongoose.Schema({
  // fields are defined here
    "details" : {
        "name": String, 
        "title": String,
        "authors": String,
        "journal": String,
        "pubdate": Date,
        "pages": Number,
        "total-paragraphs": Number,
        "abstract":String,
        "citation": String,
    },
    "paragraphs": [],
    "glossary":[],
    "serializedString": String,
});

var ParaSchema = new Mongoose.Schema({
    "pNumber": Number,
    "page": Number,
    "text": String,
    "images": [],
    "highlights":[],
    "notes": [],
});

var ImgSchema = new Mongoose.Schema({
    "fig": String,
    "label": String,
    "src": String
});


var HighSchema = new Mongoose.Schema({
    "author": String,
    "hText": String,
    "nText": String,
    "pNumber": Number, //TODO: unnecessary
    "page": Number, 
    "hStart": Number,
    "hEnd": Number
});

var NoteSchema = new Mongoose.Schema({
    "author": String,
    "body": String,
    "pNumber": Number,
    "page": Number
});

var DefSchema = new Mongoose.Schema({
    "author": String,
    "word": String,
    "def": String
});
**/

exports.Papers = Mongoose.model('Paper', PaperSchema);
