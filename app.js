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
io.on('connection',(client)=>{
          console.log('client connected');
          //******************************Events for everyone ***************************//
          //set uniquely identifying username (user's  id). This is for referring the socket to a user.
          client.on('add_username',(username)=>{
              if (!io.sockets.sockets.map((user)=>{
                  return user.username;
              }).includes(username)){
                    client.username = username;
                    client.emit('username_added',{'status':'ok'});
                }
                else{
                    client.emit('username_added',{'status':'declined'});
                }
          });



          //**************************events for hillrunners:*****************************//
          client.on('accept_quest',(object)=>{
              //note that object is : {id: 'ID OF QUEST',hillrunner:'_id OF HILLRUNNER.'}
                    // 1. update quest object's state field:
                    Quest.findAndUpdate({id: object.id},  {
                        state: "accepted",
                        hillrunner:object.hillrunner
                    },function (error,foundQuest){
                        if (error){
                            console.log(`app.js: accepted in FINDANDUPDATE FOR ${object.id} FAILED.`)
                        }
                        else{
                            //2. update map for other users:

                            io.emit('user_accepted_quest',object.id);
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
                      }, function(error, updatedPlayer){
                        if (error){
                            console.log("app.js: ERROR UPDATING PLAYER WITH QUEST");
                        } else {
                            //3. update map for other users:
                            io.emit('user_assigned_quest', quest);
                        }
                      });
                  }
              });
          });


          client.on('complete_quest',(quest)=>{
              console.log(`quest ${quest.name} completed.`);
              //1. Update completion in quest collection
              Quest.findAndUpdate({id: quest._id},  {
                  state: "completed"
              },function (error,foundQuest){
                  if (error){
                      console.log(`app.js: completion in FINDANDUPDATE FOR ${quest.name} FAILED.`)
                  }
                  else{
                      //2 update reward into hillrunner's moneyearned.
                      User.findAndUpdate({id: quest.hillrunner/* TODO: Find the user's ID*/},{
                          $inc: {
                              moneyearned: quest.reward,
                              experience: 100,
                              level: 1,
                          }
                      },function(error, HillRunner){

                      });
                      //3. TODO: EMAIL API: Confirm completion through email.
                      //quest.requester.


                      //4. send completion confirmation event to quest's hillrunner's socket..
                      io.sockets.sockets[io.sockets.sockets.map(function(sockets){
                          return sockets.username;
                      }).indexOf(quest.hillrunner)].emit('quest_completed',quest);//emit to the hillrunner, and hillrunner can update exp, earned money, in their own view.
                  }
              });



          });


});
