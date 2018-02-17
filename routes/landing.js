//Express set up
let express = require('express');
let	router = express.Router({ mergeParams: true });

//Models set up
let User = require("../models/user");

router.get('/', function(req, res) {
	User.find({}, '_id', function(error,foundUsers){
		res.render("landing",{
			id1: foundUsers[0]._id,
			id2: foundUsers[1]._id,
		});
	});
});

router.get('/:id', function(req,res){
	User.findById(req.params.id, function(error,foundUser){
		if (error){
			console.log("landing.js CANNOT FIND USER BY ID");
			res.render('404', { status: 404, url: req.url });
		} else {
			res.render('dashboard',{
				user: foundUser,
			});
		}
	});
});

module.exports = router;