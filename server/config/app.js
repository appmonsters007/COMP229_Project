// installed 3rd party packages
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

// authentication
let session = require('express-session')
let passport = require('passport')
let local_strategy = require('passport-local').Strategy
let flash = require('connect-flash')

// database setup
let mongoose = require('mongoose')
let db = require('./db')

// point mongoose to the DB URI
mongoose.connect(db.URI, {useNewUrlParser: true, useUnifiedTopology: true})

let mongoDB = mongoose.connection
mongoDB.on('error', console.error.bind(console, 'Connection Error:'))
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...')
})

let indexRouter = require('../routes/index')
let usersRouter = require('../routes/user')
let gamesRouter = require('../routes/game')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') // express  -e

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../public')))
app.use(express.static(path.join(__dirname, '../../node_modules')))

// setup express session
app.use(session({secret:'secret',saveUninitialized:false,resave:false}))
// initialize flash
app.use(flash())
// initialize passport
app.use(passport.initialize())
app.use(passport.session())
// create a user model instance
let user = require('../models/user').user
// authentication strategy
passport.use(new local_strategy(
  function(username, password, done) {
    user.findOne({ username: username }, function (err, user) {
      if (err) { return done(err) }
      if (username !== user.username) { return done(null, false) }
      if (password !== user.password) { return done(null, false) }
      return done(null, user)
    })
  }
))
// serialize and deserialize the user info
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use('/', indexRouter)
app.use('/', usersRouter)
app.use('/game-match', gamesRouter)

// catch 404 and forward to error handler
app.use(function(_, res) {
  res.render('errors/404',{title:'page not found'})
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { title: 'Error'})
})

module.exports = app