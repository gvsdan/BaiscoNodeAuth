var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.conection;

// User Schema
var UserSchema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    password:{
        type: String,
        required: true,
        bcrypt: true,
    },
    email:{
        type: String,
    },
    name:{
        type: String,
    },
    profileimage:{
        type: String,
    }
});

var User  = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if(err) throw err;
        // set hashed password
        newUser.password = hash;
        // Create User
        newUser.save(callback);
    });
};
