const mongoose = require('mongoose');

const ScoreInformation = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    score: { 
        type: Number
    },
    streak:{
        type: Number
    }
  }, {collection: "ScoreInformation"});

module.exports = mongoose.model('Score', ScoreInformation);