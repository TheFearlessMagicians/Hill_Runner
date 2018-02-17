//Mongoose set up
let mongoose = require("mongoose");

//Passport set up 
passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
	name: String,
	nickName: String,
	email: String,
	username: String,
	password: String,
	address: {
		houseAddress: String,
		city: String,
		state: String,
		zip: String,
	},
	url: String,
	created: {
		type: Date,
		default: Date.now,
	},
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
