var data = require("../data.json");
var testData = require("../test.json");

exports.view = function(req, res) {
	res.render('index', data);
};