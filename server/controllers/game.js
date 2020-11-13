let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Game = require('../models/game');

module.exports.displayMatchList = (req, res, next) => {
    Game.find((err, matchList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('index', {title: 'Games', MatchList: matchList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('game-match/add', {title: 'Create Tournament'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newMatch = Game({
        "name": req.body.name,
        "description": req.body.author,
        "owner": req.body.owner,
        "active": req.body.active,
        "date": req.body.date
    });

    Game.create(newMatch, (err, Game) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the match list
            res.redirect('/game-match');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Game.findById(id, (err, matchEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('game/edit', {title: 'Edit Tournament', game: matchEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedMatch = Game({
        "_id": id,
        "name": req.body.name,
        "description": req.body.author,
        "owner": req.body.owner,
        "active": req.body.active,
        "date": req.body.date
    });

    Game.updateOne({_id: id}, updatedMatch, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/game-match');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Match.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/game-match');
        }
    });
}