let mongoose = require('mongoose')

// create a model class
let gameModel = mongoose.Schema({
    name: String,
    description: String,
    owner: String,
    active: String,
    date: String
},
{
    collection: "games"
})

module.exports = mongoose.model('Game', gameModel)