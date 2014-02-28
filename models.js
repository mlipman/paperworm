
var Mongoose = require('mongoose');

var AuthorSchema = new Mongoose.Schema([{
    "name" : String,
    "email" : String,
    "password" : String,
}]);

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
        "citation": String
    },
    "paragraphs": [{
        "pNumber": Number,
        "page": Number,
        "text": String,
        "images": [{
            "fig": String,
            "label": String,
            "src": String
        }],
        "highlights":[{
            "iden": Number,
            "author": String, //TODO: link
            "hText": String,
            "nText": String,
            "pNumber": Number, //TODO: unnecessary
            "page": Number, 
            "hStart": Number,
            "hEnd": Number
        }],
        "notes": [{
            "iden": Number,
            "author": String, //TODO: link
            "body": String,
            "pNumber": Number, //TODO: unnecessary
            "page": Number
        }],
    }],
    "glossary":[{
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
    "paper": PaperSchema, //TODO: ID
    "page": Number,
    "text": String,
    "images": []
    "highlights":[],
    "notes": [],
});

var ImgSchema = new Mongoose.Schema({
    "pNumber": ParaSchema, //TODO: link
    "url": String,
});

var DefSchema = new Mongoose.Schema({ 
    "paper" : PaperSchema, //TODO: link
    "author": AuthorSchema, //TODO: link
    "word":String,
    "def": String,
});

var HighSchema = new Mongoose.Schema({
    "pNumber": ParaSchema, //TODO: link
    "author" : AuthorSchema, //TODO: link
    "hText" : String,
    "nText" : String,
});

var NoteSchema = new Mongoose.Schema({
    "pNumber": ParaSchema, //TODO: link
    "author": AuthorSchema, //TODO: link
    "body": String,
});
**/

exports.Authors = Mongoose.model('Author', AuthorSchema);
exports.Papers = Mongoose.model('Paper', PaperSchema);
