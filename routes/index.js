var data = require("../data.json");
var models = require('../models');

exports.view = function(req, res) {
	models.Papers.find().exec(afterQuery);
	function afterQuery(err, myresult){
		res.render('index', {"papers": myresult});
	}
	
};