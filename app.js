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

//Seeding the DB
let seed = require("./seed");
seed();

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

    //*************events for hillrunners:*********************//
    client.on('accept_quest', (quest) => {
        //TODO: 1. update quest object's state field:
        Quest.findAndUpdate({ id: quest._id }, {
            state: "accepted"
        }, function(error, foundQuest) {
            if (error) {
                console.log(`app.js: FINDANDUPDATE FOR ${quest.name} FAILED.`)
            } else {
                //2. update map for other users:
                io.emit('user_accept_quest', quest);
            }
        });
    });

    //*************Events for quest assigners****************//
    client.on('assign_quest', (quest) => {
        //Add new quest to DB's quest collection:
        /*
        NOTE. MAKE SURE THAT THE OBJECT PASSED IS IN THE
        CORRECT FORMAT
        */
        Quest.create(quest, function(error, createdQuest) {
            if (error) {
                console.log("app.js: ERROR CREATING QUEST")
            } else {
                console.log(`created a new quest called: ${quest.name}`);
                // update map for other users:
                io.emit('user_assign_quest', quest);
                User.findByIdAndUpdate(quest.requester, {
                	$push: {
                		quests: quest._id,
                	},
                }, function(error, updatedPlayer){
                	if (error){
                		console.log("app.js: ERROR UPDATING PLAYER WITH QUEST");
                	} else {
                		;
                	}
                }); 
            }
        });     
    });

});