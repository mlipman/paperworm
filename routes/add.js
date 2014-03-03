var data = require("../data.json");
var models = require('../models');
var info = require('../currSession.json');
exports.note = function(req, res) {
    var paper = req.params.paper;

	//var author = req.query.auth;
    var author = info["currUser"];
	var body = req.query.bod;
	var pNum = req.query.pNum;
	var pageNum = req.query.pageNum;
    var ID = 0;

    models.Papers.find({"details.name" : paper}).select("details.annotID").exec(one);
    function one(err, myresult){
        ID = myresult[0]["details"]["annotID"];
        console.log(ID);
        var note = {
        "pNumber": pNum,
        "iden": ID,
        "author":author,
        "page": pageNum,
        "body":body
        };
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum},{$push: {"paragraphs.$.notes" : note }}).exec(two);
    }
    function two(err, myresult){
        ID = ID + 1;
        models.Papers.update({"details.name" : paper}, {$set: {"details.annotID": ID}}).exec(three);
    }
    function three(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(finalQuery);
    }
    function finalQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect('/read/'+paper);
    }
}
/*
exports.defn = function(req, res) {
    var paper = req.params.paper;

	console.log(req.query.defn);
    var author = info["currUser"];
	var word = req.query.word;
	var def = req.query.defn;
	entry = {
        "author": author,
		"word":word,
		"def":def
	}
    models.Papers.update({"details.name" : paper},{$push: {"glossary" : entry }}).exec(afterQuery);
    
    function afterQuery(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(finalQuery)
    }
    function finalQuery(err, myresult){
        res.render('read', myresult[0])
    }

}
*/

exports.highlight = function(req, res) {
    var paper = req.params.paper;
	var pNum = req.query.pNumHi;
    var ID = 0;
    var SS = "";
    models.Papers.find({"details.name" : paper}).exec(one);
    function one(err, myresult){
        ID = myresult[0]["details"]["annotID"];
        SS = myresult[0]["serializedString"];
        console.log(SS);
        var highlight = {
            "pNumber": pNum,
            "iden": ID,
            "author":info["currUser"],
            "page": req.query.pageNum,
            "hText":req.query.htext,
            "hStart":0,
            "hEnd":0,
            "nText":req.query.ntext
        };
        var paper = req.params.paper;
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum},{$push: {"paragraphs.$.highlights" : highlight }}).exec(two);
    }
    function two(err, myresult){
        ID = ID + 1;
        models.Papers.update({"details.name" : paper}, {$set: {"details.annotID": ID}}).exec(three);
    }
    function three(err, myresult){
         models.Papers.update({"details.name" : paper}, {$set: {"serializedString": req.query.sstring}}).exec(four); //TODO: not sure how this serializedString works. Needs old SS?
    }
    function four(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(finalQuery);
    }
    function finalQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect('/read/'+paper);
    }

}

exports.delNote = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;

    models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum}, {$pull: {"paragraphs.$.notes": {"iden": ID}}}).exec(afterQuery);
    function afterQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
}

exports.delHi = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum}, {$pull: {"paragraphs.$.highlights": {"iden": ID}}}).exec(afterQuery);
    function afterQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
}

exports.delDef = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.ID;
    var url = req.query.url;
    models.Papers.update({"details.name" : paper}, {$pull: {"glossary": {"dID": ID}}}).exec(afterQuery);
    function afterQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
}

exports.editNote = function(req, res){ //TODO: GINA
    var paper = req.params.paper;
    var ID = req.query.iden;
    var newpNum = req.query.pNum;
    var oldpNum = req.query.oldpNum;
    var url = req.query.url;
    var text = req.query.bod;
    console.log(ID);

    if (oldpNum == newpNum){
        //edit in place
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": newpNum, "paragraphs.$.notes.iden": ID},{$set: {"paragraphs.$.notes.$.body" : text }}).exec(one);
    }else{
        //delete old
        //create new
    }

    function one(err, myresult){
        console.log(myresult);
        models.Papers.find({"details.name" : paper}).exec(two);
    }
    function two(err, myresult){
        console.log(myresult[0]);
        res.render('read', myresult[0]);
        res.redirect(url);
    }
    /*
    data[paper]["paragraphs"][oldpNum - 1]["notes"][index]["body"] = text;
    if (newpNum != oldpNum){
        data[paper]["paragraphs"][newpNum - 1]["notes"].push(data[paper]["paragraphs"][oldpNum - 1]["notes"][index]);
        data[paper]["paragraphs"][oldpNum - 1]["notes"].splice(index, 1);
        len =  data[paper]["paragraphs"][newpNum - 1]["notes"].length; //update paragraph number, page number
        data[paper]["paragraphs"][newpNum - 1]["notes"][len-1]["pNumber"] = newpNum;
        data[paper]["paragraphs"][newpNum - 1]["notes"][len-1]["page"] = data[paper]["paragraphs"][newpNum - 1]["page"];
    }
    */
    
}

exports.editHi = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var newpNum = req.query.pNumHi;
    var oldpNum = req.query.oldpNum;
    var url = req.query.url;
    var text = req.query.ntext;
    var highlight = req.query.htext;
    if (highlight.charAt(0)!='"'){
        highlight = '"'+highlight
    }
    if (highlight.charAt(highlight.length-1)!='"'){
        highlight = highlight + '"'
    }
    if(newpNum == oldpNum){
        //edit in place

    }else{
        //delete old
        //create new
    }
    /*
    data[paper]["paragraphs"][oldpNum - 1]["highlights"][index]["nText"] = text;
    data[paper]["paragraphs"][oldpNum - 1]["highlights"][index]["hText"] = highlight;//update highlight text
    if (newpNum != oldpNum){
        data[paper]["paragraphs"][newpNum - 1]["highlights"].push(data[paper]["paragraphs"][oldpNum - 1]["highlights"][index]);
        data[paper]["paragraphs"][oldpNum - 1]["highlights"].splice(index, 1)
        len =  data[paper]["paragraphs"][newpNum - 1]["highlights"].length; //update paragraph number, page number
        data[paper]["paragraphs"][newpNum - 1]["highlights"][len-1]["pNumber"] = newpNum;
        data[paper]["paragraphs"][newpNum - 1]["highlights"][len-1]["page"] = data[paper]["paragraphs"][newpNum - 1]["page"];
    }
    res.render('read', data[paper]);
    res.redirect(url);
    */
}
exports.editDef = function(req, res){ //TODO: GINA, doesn't work at all
    var paper = req.params.paper;
    var word = req.query.word;
    var changes = req.query.changes;
    var index = data[paper]["glossary"].length
    for (var i=0; i<data[paper]["glossary"].length; ++i){
        if (data[paper]["glossary"][i]["word"] == word){
            index = i;
            break;
        }
    }
    remove = []
    for (var i=0; i<data[paper]["glossary"][index]["defs"].length; ++i){
        if (data[paper]["glossary"][index]["defs"][i]["author"] in changes){
            data[paper]["glossary"][index]["defs"][i]["def"] = changes["author"]
        }
    } //TODO: remove authors no longer with definitions
    res.render('read', data[paper]);
    res.redirect('/');
}