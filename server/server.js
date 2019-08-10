const express = require('express');
//var http=require('http');
//var io=require('socket.io');
//const path=require('path');
const bodyParser = require('body-parser');
//const cors=require('cors');
//const passport=require('passport');
const mongoose = require('mongoose');
const dbConfig = require('./configurations/database.js');
const app = express();
//app.use(cors());
app.use(express.static('../client'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
let users = require('./routes/usersRoute')
app.use('/users', users);

// app.use('/',users);
//mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database" + " " + dbConfig.url);
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
/*app.post('/',function(req,resp){
    resp.send("Invalid Endpoint");
});*/
var server = app.listen(3000, function () {
    console.log("server started listening to port 3000");
    const io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log('connected to socket',socket.id);

        socket.on('chat', function(message) {
            console.log("message is",message);
            io.sockets.emit('chat', message);
        });
    });
    // io.on('connect', (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log("successfully connected to the socket");
    //     }

    // });
})



// server.listen(3000,function(){
//     console.log("server started listening yo port 3000");
// });