var data = require("../data.json");
var models = require('../models');
var info = require('../currSession.json');
exports.serializedString = function(req, res) {  
	var paper = req.params.paper;
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		var serString = myresult.serializedString;
		var hash = {};
		hash["val"] = serString;
		res.render('read', hash)
	}

}