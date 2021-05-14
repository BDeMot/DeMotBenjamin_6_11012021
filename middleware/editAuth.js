const jwt = require('jsonwebtoken')
const Sauce = require('../models/sauce')

module.exports = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id})
		.then(sauce => {
			const createrId = sauce.userId
			const token = req.headers.authorization.split(' ')[1]
			const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET + new Date().getDate())
			const userId = decodedToken.userId
			if(createrId !== userId){
				throw 'L\'utilisateur ne peut éditer cette sauce'
			} else {
				next()
			}
		})
		.catch( error => res.status(401).json ({ error: error || 'Problème d\'authentification'}))
}