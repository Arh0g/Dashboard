const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    local : {
        name: String,
        email: String,
        password: String,
        date: {
            type: Date,
            default: Date.now
        },
        widgets: { type: Array, required: false}
    },
    facebook : {
        id : String,
        token : String,
        name : String,
        widgets: { type: Array, required: false}
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User