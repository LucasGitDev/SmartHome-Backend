const mongoose = require('mongoose');

const User = mongoose.model('User', {
    login: String,
    password: String,
    name: String,
});

module.exports = User;