let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require("path");
require('dotenv').config();

// database shizzle
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/schermtijd', {
    useNewUrlParser: true
});

var db = mongoose.connection;

if (!db) {
    console.log("Error connecting db")
} else {
    console.log("Db connected successfully")
}

// app shizzle
let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// routing
let apiRoutes = require("./routes/api");

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// server
var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Running on port " + port);
});