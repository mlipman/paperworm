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
	//existed number of notes
	var num = data[paper]["paragraphs"][pNum-1]["notes"].length;
	var note = {
		"pNumber": pNum,
		"iden": num, //TODO: GINA
		"author":author,
		"page": pageNum,
		"body":body
	};

    var paper = req.params.paper;
    models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum},{$push: {"paragraphs.$.notes" : note }}).exec(afterQuery);
    function afterQuery(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(finalQuery)
    }
    function finalQuery(err, myresult){
        res.render('read', myresult[0])
    }
}

exports.defn = function(req, res) {
    var paper = req.params.paper;

	console.log(req.query.defn);
	//var author = req.query.auth;
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


exports.highlight = function(req, res) {
    var paper = req.params.paper;

	console.log("in highlight function");
	var pNum = req.query.pNumHi;
	var num = data[paper]["paragraphs"][pNum-1]["highlights"].length;
	var tempHighlight = {
		"pNumber": pNum,
		"iden": num + 1, //TODO: GINA
		"author":info["currUser"],
		"page": 1, //TODO: GINA
		"hText":req.query.htext,
		"hStart":0,
		"hEnd":0,
		"nText":req.query.ntext

	}
	data[paper]["serializedString"] = req.query.sstring;

    models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum},{$push: {"paragraphs.$.highlights" : tempHighlight }}).exec(afterQuery);

    function afterQuery(err, myresult){
        models.Papers.update({"details.name" : paper}, {$set: {"serializedString": req.query.sstring}}).exec(anotherQuery);
    }
    function anotherQuery(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(finalQuery);
    }

    function finalQuery(err, myresult){
        res.render('read', myresult[0]);
    }


}

exports.delNote = function(req, res){
    var paper = req.params.paper;

    console.log(req);
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    var index = data[paper]["paragraphs"][pNum - 1]["notes"].length;
    for (var i=0; i<data[paper]["paragraphs"][pNum - 1]["notes"].length; ++i){
        if (data[paper]["paragraphs"][pNum - 1]["notes"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data[paper]["paragraphs"][pNum - 1]["notes"].splice(index, 1);
    function afterQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
    res.render('read', data[paper]);
    res.redirect(url);
}

exports.delHi = function(req, res){
    var paper = req.params.paper;
    console.log(req.query.id);
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    var index = data[paper]["paragraphs"][pNum - 1]["highlights"].length;
    for (var i=0; i<data[paper]["paragraphs"][pNum - 1]["highlights"].length; ++i){
        if (data[paper]["paragraphs"][pNum - 1]["highlights"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data[paper]["paragraphs"][pNum - 1]["highlights"].splice(index, 1);
    function afterQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
    res.render('read', data[paper]);
    res.redirect(url);
}

exports.delDef = function(req, res){
    var paper = req.params.paper;
    var word = req.query.word;
    var index = data[paper]["glossary"].length;
    var url = req.query.url;
    for (var i=0; i<data[paper]["glossary"].length; ++i){
        if (data[paper]["glossary"][i]["word"] == word){
            index = i;
            break;
        }
    }
    data[paper]["glossary"].splice(index, 1);
    function afterQuery(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
    res.render('read', data[paper]);
    res.redirect(url);
}

exports.editNote = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var newpNum = req.query.pNum;
    var oldpNum = req.query.oldpNum;
    var url = req.query.url;
    var text = req.query.bod;
    var index = data[paper]["paragraphs"][oldpNum - 1]["notes"].length;
    for (var i=0; i<data[paper]["paragraphs"][oldpNum - 1]["notes"].length; ++i){
        if (data[paper]["paragraphs"][oldpNum - 1]["notes"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data[paper]["paragraphs"][oldpNum - 1]["notes"][index]["body"] = text;
    if (newpNum != oldpNum){
        data[paper]["paragraphs"][newpNum - 1]["notes"].push(data[paper]["paragraphs"][oldpNum - 1]["notes"][index]);
        data[paper]["paragraphs"][oldpNum - 1]["notes"].splice(index, 1);
        len =  data[paper]["paragraphs"][newpNum - 1]["notes"].length; //update paragraph number, page number
        data[paper]["paragraphs"][newpNum - 1]["notes"][len-1]["pNumber"] = newpNum;
        data[paper]["paragraphs"][newpNum - 1]["notes"][len-1]["page"] = data[paper]["paragraphs"][newpNum - 1]["page"];
    }
    res.render('read', data[paper]);
    res.redirect(url);
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
    var index = data[paper]["paragraphs"][oldpNum - 1]["highlights"].length;
    for (var i=0; i<data[paper]["paragraphs"][oldpNum - 1]["highlights"].length; ++i){
        if (data[paper]["paragraphs"][oldpNum - 1]["highlights"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
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
}
exports.editDef = function(req, res){ //TODO: GINA
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