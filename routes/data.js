var data = require("../data.json");

exports.serializedString = function(req, res) {    
	var paper = req.params.paper;
	var serString = data[paper]["serializedString"];
	var hash = {};
	hash["val"] = serString;

	res.json(hash);

}