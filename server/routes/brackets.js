let router = require('express').Router()
let bracketsController = require('../controllers/brackets')


/* GET brackets page. */
router.get('/', bracketsController.displayBracketsPage)


module.exports = router