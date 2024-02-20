const mongoose = require('mongoose');

const StreakInformation = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    streak:{
        type: Number
    }
  }, {collection: "StreakInformation"});

module.exports = mongoose.model('Streak', StreakInformation);