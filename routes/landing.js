//Express set up
let express = require('express');
let	router = express.Router({ mergeParams: true });

//Models set up
let User = require("../models/user");
let Quest = require("../models/quest");

//Credentials set up
let gmapsCredential = require('../creds/gmaps_creds');

router.get('/', function(req, res) {
	User.find({}, '_id', function(error,foundUsers){
		if (error){
			console.log("landing.js: FAILED TO FIND USERS")
		}
		res.render("index",{
			ID1: foundUsers[0]._id,
			ID2: foundUsers[1]._id,
		});
	});
});

router.get('/:id', function(req,res){
	User.findById(req.params.id, function(error,foundUser){
		if (error){
			console.log("landing.js CANNOT FIND USER BY ID");
			res.render('404', { status: 404, url: req.url });
		} else {
            Quest.find({},function(error,foundQuests){
                res.render('dashboard.ejs',{
    				user: foundUser,
                    ID:req.params.id,
                    'gmapsCredential':gmapsCredential,
                    QUESTS:foundQuests
    			});
            });

		}
	});
});

module.exports = router;
