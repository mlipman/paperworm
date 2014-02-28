var data = require("../data.json");
var models = require("../models")
var info = require('../currSession.json');
exports.view = function(req, res) {
	models.Papers.find().exec(afterQuery);
	function afterQuery(err, myresult){
		res.render('login', {"papers": myresult});
	}
};


exports.after = function(req, res) {
	req.session.username = req.query.username;
	info["currUser"] = req.session.username;
	res.redirect("/index");
};

exports.out = function(req, res) {
	req.session.destroy();
	res.redirect("/");
}