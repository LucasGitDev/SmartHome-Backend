const mongoose = require('mongoose');

const StateSystem = mongoose.model('StateSystem', {
    status: Boolean,
});

module.exports = StateSystem;