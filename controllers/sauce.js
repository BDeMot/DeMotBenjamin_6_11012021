const Sauce = require('../models/sauce')
const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.getSauce = (req, res, next) => {
	Sauce.find()
		.select('name imageUrl heat')
		.then(sauces => res.status(200).json(sauces))
		.catch(error => res.status(400).json({ error }))
}

exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce)
	const sauce = new Sauce ({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: []
	})
	console.log(sauce)
	sauce.save()
		.then(() => res.status(201).json({ message : 'Sauce ajoutée ! '}))
		.catch( error => res.status(400).json({ error }))
}
exports.getOneSauce = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET + new Date().getDate())
  const userId = decodedToken.userId

	Sauce.findOne({ _id: req.params.id })
		.select('description dislikes likes imageUrl mainPepper manufacturer name usersDisliked usersLiked userId')
		.then(sauce =>  {
      if(sauce.usersLiked.includes(userId)) {
        sauce.usersLiked = userId
        sauce.usersDisliked = []
      } else if (sauce.usersDisliked.includes(userId)) {
        sauce.usersDisliked = userId
        sauce.usersLiked = []
      } else {
        sauce.usersDisliked = []
        sauce.usersLiked = []
      }
      res.status(200).json(sauce)})
		.catch(error => res.status(404).json({ error }))
}

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file ? 
	{
		...JSON.parse(req.body.sauce),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	} : { ...req.body}
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Objet modifié !'}))
		.catch( error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id : req.params.id })
		.then(sauce => {
			const filename = sauce.imageUrl.split('/images/')[1]
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id})
				.then(() => res.status(200).json({ message : "Objet supprimé! "}))
				.catch( error => res.status(400).json({ error }))
			})
		})
		.catch(error => res.status(500).json({ error }))
}


