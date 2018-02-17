//Mongoose set up
let mongoose = require("mongoose");

//Passport set up 
passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
	name: String,
	email: String,
	username: String, 
	password: String,
	address: String,
	quests: [{
		type: mongoose.Schema.ObjectId,
		ref: "Quest",
	}],
	coordinates: {
		type: [Number],
		index: '2d',
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
