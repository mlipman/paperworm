var data = require("../data.json");

exports.serializedString = function(req, res) {    
	var serString = data["scads"]["serializedString"];
	var hash = {};
	hash["val"] = serString;

	res.json(hash);

}