// data has all the data
var data = require("../data.json");


exports.view = function(req, res) {
	// we will build a paper specific json object called info for this paper only


	var paper = req.params.paper;
	var info = data[paper];
	res.render('summary', info);
};