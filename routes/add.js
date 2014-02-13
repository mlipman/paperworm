var data = require("../data.json");

exports.note = function(req, res) {    

	var author = req.query.auth;
	var body = req.query.bod;
	var note = {
		"author":author,
		"body":body
	};
	data["scads"]["notes"].push(note);

	res.render('read', data["scads"]);	

 }

exports.defn = function(req, res) {
	console.log(req.query.defn);
	var author = req.query.auth;
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