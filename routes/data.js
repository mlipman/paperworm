var data = require("../data.json");
var models = require('../models');

exports.serializedString = function(req, res) { 
	var paper = req.params.paper;
	console.log(paper) ;
	var serString = data["scads"]["serializedString"];
	var hash = {};
	hash["val"] = serString;

	res.render('read', hash);

}