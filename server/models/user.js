let mongoose = require('mongoose')
let local_mongoose = require('passport-local-mongoose')

let user=mongoose.Schema(
  {
    username:{type:String,default:'',trim:true,required:'username is required'},
    password:{type:String,default:'',trim:true,required:'password is required'},
    email:{type:String,default:'',trim:true,required:'email is required'},
    displayname:{type:String,default:'',trim:true,required:'display name is required'},
    created:{type:Date,default:Date.now},
    update:{type:Date,default:Date.now}
  },
  {
    collection:'users'
  }
)
// configure options
let options = ({missing_password_error:'wrong/missing password'})
user.plugin(local_mongoose,options)

module.exports.user = mongoose.model('user',user)