const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const sanitizer = require('../middleware/express-validator')
const limiter = require('../middleware/express-limit')

router.post('/signup', sanitizer, userCtrl.signup)
router.post('/login', limiter, sanitizer, userCtrl.login)

module.exports = router
