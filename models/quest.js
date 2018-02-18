//Mongoose set up
let mongoose = require("mongoose");
//Time stamps set up
let timestamps = require('mongoose-timestamp');

let questSchema = new mongoose.Schema({
	name: String,
	requester: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
	},
	hillRunner: {
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
	timeCompleted: String,
});
questSchema.plugin(timestamps);
module.exports = mongoose.model("Quest", questSchema);
