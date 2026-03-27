//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

//const userScheme = new Schema({
//	username: {
//		type: String
//	},
//	password: {
//		type: String
//	}
//});

//const User = mongoose.model('User', userScheme);

const express = require('express');
const router = express.Router();
const passport= require('passport')
const jwt = require('jsonwebtoken');
const config = require('../database');
const User = require('../user');


router.post('/register', (req, res, next) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	
	User.addUser(newUser, (err, user) => {
		if(err){
			res.json({success: false, msg:'Failed to register'});
		} else {
			res.json({success: true, msg:'User registered'});
		}
	});
});

router.post('/authenticate', (req, res, next) => {
        const username = req.body.username;
	const password = req.body.password;
	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json(success: false, msg: 'user not found');
		}
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign({user}, config.secret, {
					expiresIn: 604800
				});
				res.json({
					success: true,
					token: 'JWT '+token,
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email,
						password: user.password
					}
				});
			} else {
				return res.json({success: false, msg: 'wrong password'});
			}
		});
	});
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
        res.send('PROFILE');
	res.json({user: req.user});
});

module.exports = router;
//const app = express();
//app.use(express.urlencoded({ extended: true }));

//create
//const store= (req, res, next) => {
//	let user = new User({
//		email: req.body.username,
//		query: req.body.password,
//	});

//	user.save((err) => {
//		if (err) {
//			return res.status(500).send('Error saving data');
//		}
//		res.redirect('/thank-you');
//	});
//});

//app.listen(3001, () => {
//  console.log('Server running on port 3001');
//});

//read
//const show = (req, res, next) => {
//	let username = req.body.username;
//	User.findByID(username);
//	console.log(users);
//}

//update
//const update = (req, res, next) => {
//	let username = req.body.username;

//	let updatedData = {
//		password: req.body.password;
//	}

//	User.findByIDAndUpdate(username, {$set: updatedPassword});
//}

//delete
//const destroy = (req, res, next) => {
//	let username = req.body.username;
//	User.findByIDAndRemove(username)
//}

//module.exports = {
//	store, show, update, destroy
//}
