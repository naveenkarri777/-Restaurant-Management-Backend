const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({

    username : {
        type : String,
        required : [true,"username is required"],
        unique : true,
    },

     email: {
    type: String,
    required: true,
    unique: true,      
    lowercase: true
  },

    password: {
    type: String,
    required: [true,"password is required"],
    minlength: 6       
  },

   address : {
         type : Array,
   },

   phone : {
    type : String,
    required : [true,"phone no is required"],
   },

usertype : {
  type : String,
  default : 'client',
  enum : ["client","admin"],
   },


},{ timestamps : true } );

//exports
module.exports = mongoose.model('User',Userschema);