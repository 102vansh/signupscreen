const express = require('express')
const { register, login, changepassword, forgotpassword } = require('../controllers/user.controler')
const router = express.Router()


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotpassword)
router.route('/changepassword/:token').put(changepassword)
module.exports = router 
