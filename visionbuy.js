const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('connected to database');
});

mongoose.connection.on('error', (err) => {
        console.log('error connecting to database '+err);
});


const app = express();
app.use(cors());
app.use(express.json());
const users = require('./routes/users');
const port = 3000;


const corsOptions = {
	origin: 'http://10.0.2.30:4200',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
	credentials: true,
	preflightContinue: true
};

//app.use(cors(corsOptions));
//app.use(cors({origin: '*'}));
//app.options(/.*/, cors());
//  console.log('Enabling CORS');
//  app.use(function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); //Add other headers used in your requests

//    if ('OPTIONS' == req.method) {
//      res.sendStatus(200);
//    } else {
//      next();
//    }
// });
//app.use(express.json());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());


require('./passport')(passport);

try {
	app.use('./users', users);
}catch (error){
	console.error(error.message);
}

app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.get('/register', (req, res) => {
        res.send('Reached registration page.');
});


app.listen(port, function() {
        console.log("server is running on" + port);
});



//mongoose.connect('mongodb://10.0.2.20:27017/testdb', {useNewURLParser: true, useUnifiedTopology: true});
//const db = mongoose.connection;

//async function connectDB() {
//	try{
//		const uri = 'mongodb://appuser:securePassword123@10.0.2.20:27017/mydatabase?authSource=admin';
//
//		await mongoose.connect(uri, {
//			useNewUrlParser: true,
//			useUnifiedTopology: true,
//			serverSelectionTimeoutMS: 5000
//		});
//
//		console.log('Connected to DB');
//	}catch (error) {
//		console.error('Error connecting to DB', error.message);
//		process.exit(1);
//	}
//}

//connectDB();

//const http = require('http');

//const fs = require('fs');

//const server = http.createServer(function(req, res) {
//	res.statusCode = 200;
//	res.setHeader('Content-Type', 'text/html');
//	try{
//		const html = fs.readFileSync('index.html');
//		res.write(html);
//		res.end();
//	} catch(e) {
//		res.statusCode = 404;
//		res.write("Bad request");
//		console.log(e);
//		res.end();
//	}
//})

//const port = 3001;

