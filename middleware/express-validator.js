const { body } = require('express-validator')

module.exports = 
	body('email').normalizeEmail().escape(),
	body('name').escape(),
	body('manufacturer').escape(),
	body('description').escape(),
	body('mainpepper').escape(),
	body('imageUrl').escape(),
	body('heat').escape(), 
	(req, res, next) => {
	next()
}

