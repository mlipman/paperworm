// data has all the data
var data = require("../data.json");


exports.view = function(req, res) {
	// we will build a paper specific json object called info for this paper only
	var scadsHash = data["scads"];

	var info = scadsHash;



	res.render('index', info);
};