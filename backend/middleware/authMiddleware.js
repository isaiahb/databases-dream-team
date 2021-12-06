require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const JWT_PRIVATE_KEY = process.env._JWT_PRIVATE_KEY;

async function loggedIn(req, res, next) {
	//try to get auth jwt from cookies and load user object into req
	try {
		// console.log(req.cookies);
		let payload = jwt.verify(req.cookies["user"], JWT_PRIVATE_KEY);
		req.user = await UserService.getByEmail(payload.email);
		return next();
	} catch (e) {
		//unauthorized
		return res.status(401).send("Unauthorized! Must login to use endpoint: " + req.url).end();
	}
}

module.exports = {
	loggedIn
}