module.exports.displayHomePage = (req, res) => {
    res.render('index', {title: 'Home',displayname:req.user?req.user.displayname:''})
}

module.exports.displayMatchList = (req, res) => {
    res.render('game', {title: 'Winning Thrill',displayname:req.user?req.user.displayname:''})
}