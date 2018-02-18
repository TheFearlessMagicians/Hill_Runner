//Express JS setup
let express = require("express")
let app = express();
let router = require('express-router');
const serverPort = 8000;

//Socket.io setup
let io = require('socket.io')();

//Models
let User = require("./models/user");
let Quest = require("./models/quest");

// SendGrid Setup
let sendEmail = require("./emailNotifications/email")

//Seeding the DB
let seed = require("./seed/seed");
let seeData = require("./seed/seedData")
seed();
//Sending data to new users.
// seeData.forEach(function(user){
// 	sendEmail(user.email,"Welcom to Hill Runner","Aw shucks! Thanks for signing up :) \n Regards, \n The Hill Runner Team");
// });

//Passport JS setup


//Not yet


//BodyParser set up
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose set up
mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/HillRunner");

//MethodOverride set up
let methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Route configuration
app.use('/public', express.static(__dirname + '/public'));
app.use(require('./routes/landing'));

//App settings
app.set('port', serverPort);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('sockets', []);

//Server setup
let server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});
app.set('isLocal', true);
console.log('Serving on local host')


//SOCKET CODE:
io.on('connection', (client) => {
    console.log('client connected');
    //******************************Events for everyone ***************************//
    //set uniquely identifying username (user's  id). This is for referring the socket to a user.
    client.on('add_username', (username) => {
        if (!io.sockets.sockets.map((user) => {
                return user.username;
            }).includes(username)) {
            client.username = username;
            client.emit('username_added', { 'status': 'ok' });
        } else {
            client.emit('username_added', { 'status': 'declined' });
        }
    });



    //**************************events for hillrunners:*****************************//
    client.on('accept_quest', (object) => {
        //note that object is : {id: 'ID OF QUEST',hillrunner:'_id OF HILLRUNNER.'}
        // 1. update quest object's state field:
        Quest.findByIdAndUpdate(object.id , {
            state: "accepted",
            hillrunner: object.hillrunner
        }, function(error, foundQuest) {
            if (error) {
                console.log(`app.js: ACCEPT IN FINDANDUPDATE FOR ${object.id} FAILED.`)
            } else {
                //2. update map for other users:
                User.findById({ id: quest.hillrunner /* TODO: Find the user's ID*/ }, {}, function(error, hillRunner) {
                    if (error) {
                        console.log("app.js FAILED TO FIND HILL RUNNER AND SEND HIM/HER EMAIL CONFIRMATION FOR ACCEPTING");
                    } else {
                        User.findById(quest.requester, function(error, requester) {
                            if (error) {
                                console.log("app.js FAILED TO FIND REQUESTER AND SEND HIM/HER EMAIL CONFIRMATION FOR ACCEPTING");
                            } else {
                                let subjectRequester = "You quest has been accepted";
                                let textRequester = `You quest has been accepted.\n
		                      		Deatails\n
		                      		Accepted by ${hillRunner.name}\n
		                      		Reward to be paid ${quest.reward}\n
		                      		Accepted at ${quest. }\n
		                      		\n
		                      		Thank-you for using Hill Runner!
		                      		`
                                sendEmail(requester.email, subjectRequester, textRequester);
                                let subjectHillRunner = "You have received a quest";
                                let textHillRunner = `You have received a quest from ${requester.name}.\n
		                      		Your reward for completion is ${quest.reward}.\n
		                      		You will earn 100 experience points.\n
		                      		\n
		                      		Thank-you for using Hill Runner!
		                      		`
                                sendEmail(hillRunner.email, subjectHillRunner, textHillRunner);
                            }
                        });
                    }
                });
                io.emit('user_accepted_quest', object.id);
            }
        });

    });


    //*************************Events for quest assigners***********************//
    client.on('assign_quest', (quest) => {
        /*
        NOTE. MAKE SURE THAT THE OBJECT PASSED IS IN THE
        CORRECT FORMAT
        */
        //1. Add new quest to DB's quest collection:
        Quest.create(quest, function(error, createdQuest) {
            if (error) {
                console.log("app.js: ERROR CREATING QUEST")
            } else {
                console.log(`created a new quest called: ${quest.name}`);
                //2. Update user db to add this new quest:
                User.findByIdAndUpdate(quest.requester, {
                    $push: {
                        quests: quest._id,
                    },
                }, function(error, updatedPlayer) {
                    if (error) {
                        console.log("app.js: ERROR UPDATING PLAYER WITH QUEST");
                    } else {
                        //3. update map for other users:
                        io.emit('user_assigned_quest', quest);
                    }
                });
            }
        });
    });


    client.on('complete_quest', (quest) => {
        console.log(`quest ${quest.name} completed.`);
        //1. Update completion in quest collection
        Quest.findAndUpdate({ id: quest._id }, {
            state: "completed"
        }, function(error, foundQuest) {
            if (error) {
                console.log(`app.js: completion in FINDANDUPDATE FOR ${quest.name} FAILED.`)
            } else {
                //2 update reward into hillrunner's moneyearned.
                User.findAndUpdate({ id: quest.hillrunner /* TODO: Find the user's ID*/ }, {
                    $inc: {
                        moneyearned: quest.reward,
                        experience: 100,
                        level: 1,
                    }
                }, function(error, hillRunner) {
                    if (error) {
                        console.log("app.js FAILED TO FIND HILL RUNNER AND SEND HIM/HER EMAIL CONFIRMATION");
                    } else {
                        User.findById(quest.requester, function(error, requester) {
                            if (error) {
                                console.log("app.js FAILED TO FIND REQUESTER AND SEND HIM/HER EMAIL CONFIRMATION");
                            } else {
                                let subjectRequester = "You quest has been completed";
                                let textRequester = `You quest has been completed.\n
		                      		Deatails\n
		                      		Fulfiled by ${hillRunner.name}\n
		                      		Reward paid ${quest.reward}\n
		                      		Completed at ${quest.updatedAt}\n
		                      		\n
		                      		Thank-you for using Hill Runner!
		                      		`
                                sendEmail(requester.email, subjectRequester, textRequester);
                                let subjectHillRunner = "Congragulations on quest completion";
                                let textHillRunner = `You completed a quest for ${requester.name}.\n
		                      		Your reward is ${quest.reward}.\n
		                      		You completed the quest at ${quest.updatedAt}.\n
		                      		You earned 100 experience points.\n
		                      		\n
		                      		Thank-you for using Hill Runner!
		                      		`
                                sendEmail(hillRunner.email, subjectHillRunner, textHillRunner);
                            }
                        });
                    }
                });

            }
        });
        io.sockets.sockets[io.sockets.sockets.map(function(sockets) {
            return sockets.username;
        }).indexOf(quest.hillrunner)].emit('quest_completed', quest); //emit to the hillrunner, and hillrunner can update exp, earned money, in their own view.
    });
});