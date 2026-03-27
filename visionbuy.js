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
const users = require('./routes/users');
const port = 3001;

app.use(cors());

app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());


require('./passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.listen(port, function() {
        console.log("server is running on" + port);
});



//mongoose.connect('mongodb://localhost:27017/testdb', {useNewURLParser: true, useUnifiedTopology: true});
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

