// create a reference to the model
let Game = require('../models/game');

module.exports.displayMatchList = (req, res) => {
    Game.find((err, matchList) => {
        if(err)
        {
            return console.error(err)
        }
        else
        {
            res.render('game/match', {title: 'Winning Thrill', MatchList: matchList,displayname:req.user?req.user.displayname:''})
        }
    })
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('game/add', {title: 'Create Tournament'})
}

module.exports.processAddPage = (req, res, next) => {
    let newMatch = Game({
        "name": req.body.name,
        "description": req.body.description,
        "owner": req.body.owner,
        "Active": req.body.Active,
        "Date": req.body.Date
    });

    Game.create(newMatch, (err) =>{
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
        "description": req.body.description,
        "owner": req.body.owner,
        "Active": req.body.Active,
        "Date": req.body.Date
    });

    Game.updateOne({_id: id}, updatedMatch, (err) => {
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

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Game.remove({_id: id}, (err) => {
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