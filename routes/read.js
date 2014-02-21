var data = require("../data.json");

exports.view = function(req, res) {
	var paper = req.params.paper;
	var info = data[paper];
	res.render('read', info);
};