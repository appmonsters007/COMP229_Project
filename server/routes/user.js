let router = require('express').Router()
let user_controller = require('../controllers/user')

/* GET login page */
router.get('/login', user_controller.display_login)
/* POST login page */
router.post('/login', user_controller.process_login)
/* GET register page */
router.get('/register', user_controller.display_register)
/* POST register page */
router.post('/register', user_controller.process_register)
/* GET logout page */
router.get('/logout', user_controller.logout)
module.exports = router