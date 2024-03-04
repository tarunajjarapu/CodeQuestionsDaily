const mongoose = require('mongoose');

const QuestionInfo = new mongoose.Schema({
    question:{
        type: String,
        require: true
    },
    answer:{
        type: String,
        require: true
    },
    choices: [{
        type: String,
        require: true
    }]
  }, {collection: "QuestionInfo"});

module.exports = mongoose.model('Question', QuestionInfo);