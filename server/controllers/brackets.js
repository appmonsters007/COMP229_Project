let Game = require('../models/game');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

module.exports.displayBracketsPage = (req, res) => {
    res.render('brackets', {title: 'Tournament'})
}