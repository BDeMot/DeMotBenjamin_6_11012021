const express = require('express')
const router = express.Router()

const sauceCtrl = require('../controllers/sauce')
const auth = require('../middleware/auth')
const editAuth = require('../middleware/editAuth')
const multer = require('../middleware/multer-config')

router.get('/', auth, sauceCtrl.getSauce)
router.post('/', auth, multer, sauceCtrl.createSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.put('/:id', auth, editAuth, multer,  sauceCtrl.modifySauce)
router.delete('/:id', auth, editAuth,)
router.post('/:id/like', auth)

module.exports = router
