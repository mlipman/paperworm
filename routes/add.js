var data = require("../data.json");
var models = require('../models');
var info = require('../currSession.json');

exports.note = function(req, res) {
    var paper = req.params.paper;

	//var author = req.query.auth;
    var author = req.session.username ? req.session.username : "user" ;
	var body = req.body.bod;
	var pNum = req.body.pNum;
	var pageNum = 0;
    var ID = 0;

    models.Papers.find({"details.name" : paper}).select("details.annotID").exec(one);
    function one(err, myresult){
        ID = myresult[0]["details"]["annotID"];
        
        var note = {
        "pNumber": pNum,
        "iden": ID,
        "author":author,
        "page": pageNum,
        "body":body
        };
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum},{$push: {"paragraphs.$.notes" : note }}).exec(function(err, myresult) {return two(err, myresult, note)});
    }
    function two(err, myresult, note){
        ID = ID + 1;
        models.Papers.update({"details.name" : paper}, {$set: {"details.annotID": ID}}).exec(function(err, myresult) {return three(err, myresult, note)});
    }
    function three(err, myresult, note){
        models.Papers.find({"details.name" : paper}).exec(function(err, myresult) {return finalQuery(err, myresult, note)});
    }
    function finalQuery(err, myresult, note){
        //res.render('read', myresult[0]);
        //res.redirect('/read/'+paper);
        res.json(note);  // need to pass note to show
    }
}
/*
exports.defn = function(req, res) { //not sure if tested...
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
exports.setSS = function(req, res){
    var paper = req.params.paper;
    models.Papers.update({"details.name" : paper}, {$set: {"serializedString": req.query.sstring}}).exec(finalQuery);
    function finalQuery(err, myresult){
        res.redirect('/read/'+paper);
    }
}


exports.highlight = function(req, res) {
    var paper = req.params.paper;
	var pNum = req.body.pNumHi;
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
            "author":req.session.username ? req.session.username : "user" ,
            "page": 0,
            "hText":req.body.htext,
            "hStart":0,
            "hEnd":0,
            "nText":req.body.ntext
        };
        var paper = req.params.paper;
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": pNum},{$push: {"paragraphs.$.highlights" : highlight }}).exec(two);
    }
    function two(err, myresult){
        ID = ID + 1;
        models.Papers.update({"details.name" : paper}, {$set: {"details.annotID": ID}}).exec(three);
    }
    function three(err, myresult){
         models.Papers.update({"details.name" : paper}, {$set: {"serializedString": req.body.sstring}}).exec(four); //TODO: will be unnecessary
    }
    function four(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(finalQuery);
    }
    function finalQuery(err, myresult){
        res.json({});
        // res.render('read', myresult[0]);
        // res.redirect('/read/'+paper);
    }

}

exports.delNote = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    url = "/"+url.substr(1).replace("/", "alt/");

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

exports.editNote = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var newpNum = req.query.pNum;
    var oldpNum = req.query.oldpNum;
    var url = req.query.url;
    var text = req.query.bod;
    console.log(paper+ID+newpNum+oldpNum+url+text);
    //get old info
    models.Papers.find({"details.name" : paper, "paragraphs.pNumber": newpNum, "paragraphs.notes.iden":ID}).exec(one);

    function one(err, myresult){
        var curr = myresult[0]["paragraphs"][oldpNum-1]["notes"];
        var i=0;
        for (; i<curr.length; ++i){
            if (curr[i]["iden"] == ID){
                curr[i]["body"] = text;
                curr[i]["pNumber"] = newpNum;
                curr[i]["page"] = myresult[0]["paragraphs"][newpNum-1]["page"];   
                break; 
            }
        }
        if (oldpNum == newpNum){
            models.Papers.update({"details.name" : paper, "paragraphs.pNumber": newpNum, "paragraphs.notes.iden":ID}, {$set: {"paragraphs.$.notes": curr}}).exec(two);
        } else{
            models.Papers.update({"details.name" : paper, "paragraphs.pNumber": newpNum},{$push: {"paragraphs.$.notes" : curr[i] }}).exec(oneb);
        }
    }
    function oneb(err, myresult){
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": oldpNum}, {$pull: {"paragraphs.$.notes": {"iden": ID}}}).exec(two);    
    }
    function two(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(three);
    }
    function three(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
    
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

    //get old info
    models.Papers.find({"details.name" : paper, "paragraphs.pNumber": newpNum, "paragraphs.highlights.iden":ID}).exec(one);

    function one(err, myresult){
        var curr = myresult[0]["paragraphs"][oldpNum-1]["highlights"];
        var tmp = {}
        var i=0;
        for (; i<curr.length; ++i){
            if (curr[i]["iden"] == ID){
                curr[i]["nText"] = text;
                curr[i]["hText"] = highlight;
                curr[i]["pNumber"] = newpNum;
                curr[i]["page"] = myresult[0]["paragraphs"][newpNum-1]["page"];  
                break; 
            }
        }
        if (oldpNum == newpNum){
            console.log(curr[i]);
            models.Papers.update({"details.name" : paper, "paragraphs.pNumber": newpNum, "paragraphs.highlights.iden":ID}, {$set: {"paragraphs.$.highlights": curr}}).exec(two);
        } else{
            console.log(curr[i]);
            models.Papers.update({"details.name" : paper, "paragraphs.pNumber": newpNum},{$push: {"paragraphs.$.highlights" : curr[i] }}).exec(oneb);
        }
    }
    function oneb(err, myresult){
        models.Papers.update({"details.name" : paper, "paragraphs.pNumber": oldpNum}, {$pull: {"paragraphs.$.highlights": {"iden": ID}}}).exec(two);    
    }
    function two(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(three);
    }
    function three(err, myresult){
        res.render('read', myresult[0]);
        res.redirect(url);
    }
}
exports.editDef = function(req, res){
    var paper = req.params.paper;
    var ID = req.query.iden;
    var word = req.query.word;
    var def = req.query.def;
    console.log(ID);
    models.Papers.update({"details.name" : paper, "glossary.dID" : ID}, {$set: {"glossary.$.word": word, "glossary.$.def": def}}).exec(one);
    function one(err, myresult){
        models.Papers.find({"details.name" : paper}).exec(three);
    }
    function three(err, myresult){
        res.render('read', myresult[0]);
        res.redirect('/summary/'+paper);
    }
}