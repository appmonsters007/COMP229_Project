module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'})
}

module.exports.displayMatchList = (req, res, next) => {
    res.render('game', {title: 'Winning Thrill'})
}