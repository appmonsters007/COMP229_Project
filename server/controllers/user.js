let passport = require('passport')
// create the user model instance
let user = require('../models/user').user

module.exports.display_login = (req,res) => {
  // check login
  if(!req.user)
  {
    res.render('authentication/login',
    {
      title:'Login',
      messages:req.flash('login message'),
      displayname:req.user?req.user.displayname:''
    })
  }
  else
  {
    return res.redirect('/')
  }
}
module.exports.process_login = (req,res,next) => {
  passport.authenticate('local',
  (err,user) => {
    // server error
    if(err)
    {
      return next(err)
    }
    // login error
    if(!user)
    {
      req.flash('login message','authentication error')
      return res.redirect('/login')
    }
    req.login(user,(err)=>{
      // server error
      if(err)
      {
        return next(err)
      }
      // let payload = {id:user._id,displayname:user.displayname,username:use.username,email:user.email}
      // let token = jwt.sign(payload,'secret',{expiresIn:604800})// expire in one week
      /* peek the payload and token
      res.json({success:true,msg:'successful logined',user:{id:user._id,displayname:user.displayname,username:use.username,email:user.email},token:token})
      */
      return res.redirect('/game-match')
    })
  })(req,res,next)
}
module.exports.display_register = (req,res) => {
  // check login
  if(!req.user)
  {
    res.render('authentication/register',
    {
      title:'Register',
      messages:req.flash('register messages'),
      displayname:req.user?req.user.displayname:''
    })
  }
  else
  {
    return res.redirect('/')
  }
}
module.exports.process_register = (req,res) => {
  let new_user = new user({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
    displayname:req.body.displayname
  })
   user.register(new_user,req.body.password,(err)=>{
   if(err)
   {
     console.log('insert new user error')
     if(err.name=='UserExistsError')
     {
       req.flash('register message','user already exists')
       console.log('user already exists')
     }
     res.render('authentication/register',
     {
        title:'Register',
        messages:req.flash('register messages'),
        displayname:req.user?req.user.displayname:''
     })
   }
   else
   {
     /* peek state
     res.json({success:true,msg:'sucessful registered'})
     */
     // successful registration
     return passport.authenticate('local')(req,res,() => {
       res.redirect('/game-match')
     })
   }
  })
}
module.exports.logout = (req,res) => {
  req.logout()
  res.redirect('/')
}