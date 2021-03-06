var express = require("express")
var db = require("./database.js")
let bodyParser = require('body-parser');
let path = require("path");
const auth = require('./auth');

require('dotenv').config();

// app shizzle
let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// routing
let apiRoutes = require("./routes/api");

app.use('/api', apiRoutes);

app.use('/admin/score.html', auth);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// server
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Running on port " + port);
});