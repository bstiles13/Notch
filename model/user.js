let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String,
    created: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;