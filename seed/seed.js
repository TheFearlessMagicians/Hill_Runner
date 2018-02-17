//Mongoose set up
let mongoose = require("mongoose");

//Models imports
let Quest = require("../models/quest");
let User = require("../models/user");

//seedData
let usersList = require("./seedData");

let seed = () => {
    User.collection.drop(function(error) {
        if (error) {
            console.log("seed.js: FAILED TO DROP USERS COLLECTION");
        } else {
            User.count({}, function(error, count) {
                if (error) {
                    console.log("seed.js: FAILED TO GET COUNT OF USERS COLLECTION");
                } else {
                    if (count == 0) {
                        usersList.forEach(function(seedUser) {
                            User.create(seedUser, function(error, createdUser) {
                                if (error) {
                                    console.log("seed.js: FAILED TO SEED USER");
                                } else {
                                	;
                                }
                            });
                        });
                    }
                }
            });
        }
    });
}
module.exports = seed;