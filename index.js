let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let apiRoutes = require("./api-routes")

mongoose.connect('mongodb://localhost/game-manager', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
let db = mongoose.connection;

if (!db) {
    console.log("Error connecting to MongoDB")
} else {
    console.log("Success connecting to MongoDB")
}

let app = express();

// To handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure API routes
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes)

// Listen to specified port
let port = process.env.PORT || 8080;
app.listen(port, function () {
     console.log("Running game-manager on port " + port);
});
