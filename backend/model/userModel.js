const mongoose = require('mongoose')
const userSchmea = mongoose.Schema({
     name:{
        type:String,
        required:[true,'Please Add a name']
     },
     email:{
        type:String,
        required:[true,'Please Add an email']
     },
     password:{
        type:String,
        required:[true,'Please Add a password']
     },
  },
  {
    timestamps:true
  }
)

module.exports = mongoose.model('User',userSchmea)