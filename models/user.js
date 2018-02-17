//Mongoose set up
let mongoose = require("mongoose");

//Passport set up 

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
module.exports = mongoose.model("User", userSchema);
