require('dotenv').config()
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let apiRoutes = require('./api-routes')
let serverless = require('serverless-http')

mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
// mongoose.connect("mongodb+srv://ongaaron96:sq2pdbi5s@cluster0.wlwwz.mongodb.net/game-manager?retryWrites=true&w=majority", { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// });
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
app.use('/.netlify/functions/api', apiRoutes)

// Listen to specified port
const port = process.env.PORT || 8080;
app.listen(port, function () {
     console.log("Running game-manager on port " + port);
});

module.exports = app
module.exports.handler = serverless(app)
