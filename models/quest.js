//Mongoose set up
let mongoose = require("mongoose");

let questSchema = new mongoose.Schema({
	name: String,
	requester: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
	},
	description: String,
	reward: Number,
	state: String,
	coordinates: {
		type: [Number],
		index: '2d',
	},
	address: String,
	created: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Quest", questSchema);
