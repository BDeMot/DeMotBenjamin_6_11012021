const express = require('express')
const router = express.Router()

const sauceCtrl = require('../controllers/sauce')
const likesCtrl = require('../controllers/likes')
const auth = require('../middleware/auth')
const editAuth = require('../middleware/editAuth')
const multer = require('../middleware/multer-config')
const sanitizer = require('../middleware/express-validator')

router.get('/', auth, sauceCtrl.getSauce)
router.post('/', auth, multer, sanitizer, sauceCtrl.createSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.put('/:id', auth, editAuth, multer, sanitizer, sauceCtrl.modifySauce)
router.delete('/:id', auth, editAuth, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, likesCtrl.likeSauce)

module.exports = router
