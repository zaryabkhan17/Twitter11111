var { MONGOOSE_DBURI } = require("../core/index")
var mongoose = require('mongoose');

let dbURI =  MONGOOSE_DBURI



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

///////////Mongose connected or disconnected/////////////

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected")

})

mongoose.connection.on('disconnectes', function () {
    console.log("mongoose is disconnected")
    process.exit(1)
})


mongoose.connection.on('error', function (err) {
    console.log('mongoose connecion is in error: ', err)
    process.exit(1)

})

mongoose.connection.on('SIGNIT', function () {
    console.log('terminating')
    mongoose.connection.close(function () {
        console.log('mongoose default connection is closed')
        process(0)
    })


})


////////////////////////////////////////////


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    profilePic:String,
    createdOn: { type: Date, 'default': Date.now },
    activeSince: Date

})

var userModle = mongoose.model("users", userSchema)
var otpSchema = new mongoose.Schema({
    "email": String,
    "otpCode": String,
    "createdOn": { "type": Date, "default": Date.now },
});
var otpModel = mongoose.model("otps", otpSchema);

var tweetSchema = new mongoose.Schema({
    "tweet": String,
    "name": String,
    "email": String,    
    "profilePic":String,
    "createdOn": { "type": Date, "default": Date.now },
});
var tweetmodel = mongoose.model("tweet", tweetSchema);

module.exports = {
    userModle: userModle,
    otpModel: otpModel,
    tweetmodel:tweetmodel
}