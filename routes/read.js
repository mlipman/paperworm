var data = require("../data.json");
var models = require('../models');

exports.view = function(req, res) {
	var paper = req.params.paper;
	models.Papers.find().exec(afterQuery);
	function afterQuery(err, myresult){
		for (var i=0; i<myresult.length; ++i){
			if (myresult[i].details.name == paper)
				res.render('read', myresult[i]);
		}
	}
};