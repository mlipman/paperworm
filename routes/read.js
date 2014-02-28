var data = require("../data.json");
var models = require('../models');
var info = require('../currSession.json');
exports.view = function(req, res) {
	var paper = req.params.paper;
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		var temp = myresult[0];
		temp["currUser"]=user;
		temp["alt"]=false;
		res.render('read', temp);
	}
};

exports.viewAlt = function(req, res) {
	var paper = req.params.paper;
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		var temp = myresult[0];
		temp["currUser"]=user;
		temp["alt"]=true;
		res.render('read', temp);
	}
};