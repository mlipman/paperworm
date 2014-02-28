var data = require("../data.json");

exports.view = function(req, res) {
	var user = req.session.username;
	if (user==undefined){
		user="user";
	}
	var info = {"papers":data};
	info["currUser"]=user;
	res.render('index', info);
};