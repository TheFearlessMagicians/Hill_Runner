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
let passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
app.use(require('express-session')({
    secret: 'I wanna go poopiee!',
    resave: false,
    saveUninitialized: false
}));

//Not yet
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    //*************events for hillrunners:*********************//
    client.on('accept_quest',(quest)=>{
              //TODO: 1. update quest object's state field:
              //TODO: 2. update map for other users:
              io.emit('user_accept_quest',quest);
    });

    //*************Events for quest assigners****************//
    client.on('assign_quest',(quest)=>{
              //TODO 1: Add new quest to DB's quest collection:
              Quest.create()
              //TODO 2: update map for other users:
              io.emit('user_assign_quest',quest);

    });

});
