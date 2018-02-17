//Mongoose set up
let mongoose = require("mongoose");

//Models imports
let Quest = require("/models/quest");
let User = require("/models/user");

let usersList = [
	{
	    name: "Varun Narayanan",
	    email: "vchakravarthy21@g.ucla.edu",
	    username: "varun1729",
	    address: "A5 Canyon Point, Sunset Village, UCLA",
	    coordinates: [-118.45101239999997,34.0734057],	    
	},
	{
		name: "Wilson Jusuf",
		email: "wilsonjusuf@g.ucla.edu",
		username: "willyspinn",
		address: "C1 Courtside, Sunset Village, UCLA",
		ccordinates: [-118.45105039999999,34.0729717],
	}
];

let seed = () => {
    if (mongoose.connection.db.collection("Users").count() == 0) {
    	
    }
}