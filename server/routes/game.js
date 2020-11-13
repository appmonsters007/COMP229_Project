let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Game = require('../models/game');

let matchController = require('../controllers/game');

/* GET Route for the Match List page - READ Operation */
router.get('/', matchController.displayMatchList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', matchController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', matchController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', matchController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', matchController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', matchController.performDelete);

module.exports = router;