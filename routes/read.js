var data = require("../data.json");
var models = require('../models');
var info = require('../currSession.json');
exports.view = function(req, res) {
	var paper = req.params.paper;
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	info["currUser"]=user;
	info["alt"]=false;
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		res.render('read', myresult[0]);
	}
};

exports.viewAlt = function(req, res) {
	var paper = req.params.paper;
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	info["currUser"]=user;
	info["alt"]=true;
	models.Papers.find({"details.name" : paper}).exec(afterQuery);
	function afterQuery(err, myresult){
		res.render('read', myresult[0]);
	}
};