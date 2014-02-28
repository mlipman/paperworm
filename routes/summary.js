// data has all the data
var data = require("../data.json");
var models = require('../models');
var info = require('../currSession.json');
exports.view = function(req, res) {
	// we will build a paper specific json object called info for this paper only
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	info["currUser"]=user;
	var paper = req.params.paper;
	models.Papers.find({"details.name" : paper}).exec(afterQuery);

	function afterQuery(err, myresult){
		res.render('summary', myresult[0])
	}
};