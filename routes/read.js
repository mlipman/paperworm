var data = require("../data.json");

exports.view = function(req, res) {
	var paper = req.params.paper;

	var user = req.session.username;
	if (user==undefined){
		user="user";
	}

	var info = data[paper];
	info["currUser"]=user;
	info["alt"]=false;
	res.render('read', info);
};

exports.viewAlt = function(req, res) {
	var paper = req.params.paper;

	var user = req.session.username;
	if (user==undefined){
		user="user";
	}

	var info = data[paper];
	info["currUser"]=user;
	info["alt"]=true;
	res.render('read', info);
};