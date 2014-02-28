var data = require("../data.json");
var models = require('../models');

exports.view = function(req, res) {
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	info["currUser"]=user;
	models.Papers.find().exec(afterQuery);
	function afterQuery(err, myresult){
		res.render('index', {"papers": myresult});
	}
};