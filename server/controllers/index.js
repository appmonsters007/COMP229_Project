let Game = require('../models/game');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

module.exports.displayHomePage = (req, res) => {
    res.render('index', {title: 'Home',displayname:req.user?req.user.displayname:''})
}