let router = require('express').Router();
let matchController = require('../controllers/game');

// guard handler
function require_verify(req,res,next)
{
    // check login state
    if(!req.isAuthenticated())
    {
      return res.redirect('/login')
    }
    next()
}

/* GET Route for the Match List page - READ Operation */
router.get('/', matchController.displayMatchList)

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', require_verify, matchController.displayAddPage)

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', require_verify, matchController.processAddPage)

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', require_verify, matchController.displayEditPage)

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', require_verify, matchController.processEditPage)

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', require_verify, matchController.performDelete)

module.exports = router