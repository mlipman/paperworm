// data has all the data
var data = require("../data.json");


exports.view = function(req, res) {
	// we will build a paper specific json object called info for this paper only
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}

	var paper = req.params.paper;
	var info = data[paper];
	info["currUser"]=user;
	res.render('summary', info);
};