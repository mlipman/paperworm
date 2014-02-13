var data = require("../data.json");

exports.view = function(req, res) {
	var scadsHash = data["scads"];
	var info = scadsHash;
	res.render('read', info);
};