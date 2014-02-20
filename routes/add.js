var data = require("../data.json");

exports.note = function(req, res) {

	//var author = req.query.auth;
    var author = "You";
	var body = req.query.bod;
	var pNum = req.query.pNum;
	var pageNum = req.query.pageNum;
	//existed number of notes
	var num = data["scads"]["paragraphs"][pNum-1]["notes"].length;
	var note = {
		"pNumber": pNum,
		"iden": num + 1,
		"author":author,
		"page": pageNum,
		"body":body
	};
	//console.log(window.getSelection().anchorNode);
	data["scads"]["paragraphs"][pNum-1]["notes"].push(note);

	res.render('read', data["scads"]);	
}

exports.defn = function(req, res) {
	console.log(req.query.defn);
	//var author = req.query.auth;
    var author = "You";
	var word = req.query.word;
	var def = req.query.defn;

	var fullDef = {
		"author":author,
		"def":def
	};
	var defnArray = new Array();
	defnArray.push(fullDef);

	// stretch: if entry exists, add to existing
	// starting new entry
	entry = {
		"word":word,
		"defs":defnArray
	}
	data["scads"]["glossary"].push(entry);

	//console.log(data["scads"]["glossary"][])

	res.render('read', data["scads"]);	

}


exports.highlight = function(req, res) { //#HEREEEE
	console.log("in highlight function");
	var pNum = req.query.pNumHi;
	var num = data["scads"]["paragraphs"][pNum-1]["highlights"].length;
	var tempHighlight = {
		"pNumber": pNum,
		"iden": num + 1,
		"author":"You",
		"page":req.query.page,
		"hText":req.query.htext,
		"hStart":0,
		"hEnd":0,
		"nText":req.query.ntext

	}

	data["scads"]["paragraphs"][pNum - 1]["highlights"].push(tempHighlight);


	res.render('read', data["scads"]);


}

exports.delNote = function(req, res){
    console.log(req.query.id);
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    var index = data["scads"]["paragraphs"][pNum - 1]["notes"].length;
    for (var i=0; i<data["scads"]["paragraphs"][pNum - 1]["notes"].length; ++i){
        if (data["scads"]["paragraphs"][pNum - 1]["notes"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data["scads"]["paragraphs"][pNum - 1]["notes"].splice(index, 1);
    res.render('read', data["scads"]);
    res.redirect(url);
}

exports.delHi = function(req, res){
    console.log(req.query.id);
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    var index = data["scads"]["paragraphs"][pNum - 1]["highlights"].length;
    for (var i=0; i<data["scads"]["paragraphs"][pNum - 1]["highlights"].length; ++i){
        if (data["scads"]["paragraphs"][pNum - 1]["highlights"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data["scads"]["paragraphs"][pNum - 1]["highlights"].splice(index, 1);
    res.render('read', data["scads"]);
    res.redirect(url);
}

exports.editNote = function(req, res){
    console.log(req.query.id);
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    var text = req.query.text;
    var index = data["scads"]["paragraphs"][pNum - 1]["notes"].length;
    for (var i=0; i<data["scads"]["paragraphs"][pNum - 1]["notes"].length; ++i){
        if (data["scads"]["paragraphs"][pNum - 1]["notes"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data["scads"]["paragraphs"][pNum - 1]["notes"][index]["body"] = text;
    res.render('read', data["scads"]);
    res.redirect(url);
}
exports.editHi = function(req, res){
    console.log(req.query.id);
    var ID = req.query.iden;
    var pNum = req.query.pNum;
    var url = req.query.url;
    var text = req.query.text;
    var index = data["scads"]["paragraphs"][pNum - 1]["highlights"].length;
    for (var i=0; i<data["scads"]["paragraphs"][pNum - 1]["highlights"].length; ++i){
        if (data["scads"]["paragraphs"][pNum - 1]["highlights"][i]["iden"] == ID){
            index = i;
            break;
        }
    }
    data["scads"]["paragraphs"][pNum - 1]["highlights"][index]["nText"] = text;
    res.render('read', data["scads"]);
    res.redirect(url);
}