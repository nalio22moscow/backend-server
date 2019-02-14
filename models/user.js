const   mongoose                = require("mongoose"),
        passportLocalMongoose   = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: {
        type: String, 
        required: true
    },
    name:{
        userFirstname: String,
        userLastname: String,
    },
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    }
});

// allows mongoose methods
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);