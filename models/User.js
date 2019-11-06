const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    local : {
        name: String,
        email: String,
        password: String,
        date: {
            type: Date,
            default: Date.now
        }
    },
    facebook : {
        id : String,
        token : String,
        name : String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User