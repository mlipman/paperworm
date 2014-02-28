var data = require("../data.json");

exports.view = function(req, res) {
	res.render('login', {"papers":data});
};


exports.after = function(req, res) {
	req.session.username = req.query.username;
	res.redirect("/index");
};

exports.out = function(req, res) {
	req.session.destroy();
	res.redirect("/");
}