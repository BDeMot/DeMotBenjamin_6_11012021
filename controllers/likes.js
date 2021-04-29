const Sauce = require('../models/sauce')

exports.likeSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id})
	.then(sauce => {
			const userId = req.body.userId	
			switch(req.body.like) {
				case 1:
					if(!sauce.usersLiked.includes(userId)) { 
						sauce.usersLiked.push(userId)
					} else	if(sauce.usersDisliked.included(userId)) {
						let index = sauce.usersDisliked.indexOf(userId)
						sauce.usersDisliked.splice(index, 1)
					}
				break
				case 0: 
					if(sauce.usersLiked.includes(userId)) {
						let index = sauce.usersLiked.indexOf(userId)
						sauce.usersLiked.splice(index, 1)
					} else { 
						let index = sauce.usersDisliked.indexOf(userId)
						sauce.usersDisliked.splice(index, 1)
					}
				break
				case -1:
					if(!sauce.usersDisliked.includes(userId)) {
						sauce.usersDisliked.push(userId)
					} else if(sauce.usersLiked.included(userId)) {
						let index = sauce.usersLiked.indexOf(userId)
						sauce.usersLiked.splice(index, 1)
					}
				break
			}
	
		sauce.likes = sauce.usersLiked.length
		sauce.dislikes = sauce.usersDisliked.length
		sauce.save()
		.then(res.status(200).json({ message: ' Like ajouté! ' }))
		.catch(error => res.status(400).json({ error }))})
	.catch(error => res.status(400).json({ error }))
}
	