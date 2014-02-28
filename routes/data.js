var data = require("../data.json");
var models = require('../models');

exports.serializedString = function(req, res) {  
	var paper = req.params.paper;
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		for (var i=0; i<myresult.length; ++i){
			if (myresult[i].details.name == paper){
				var serString = myresult[i].serializedString;
				var hash = {};
				hash["val"] = serString;
				res.render('read', hash)
			}
		}
	}

}