var data = require("../data.json");
var models = require('../models');
exports.serializedString = function(req, res) {  
	var paper = req.params.paper;
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		var serString = myresult[0]["serializedString"];
		var hash = {};
		hash["val"] = serString;
		res.json(hash);
	}

}