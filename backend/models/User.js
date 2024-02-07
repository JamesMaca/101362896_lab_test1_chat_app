const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type: String, maxLength:100, unique: true},
    fistname: {type: String, maxLength: 100},
    lastname: {type: String, maxLength: 100},
    password: {type: String, maxLength: 50},
    createdon: {type: Date, default: Date.now}

})

module.exports = mongoose.model("user", userSchema)