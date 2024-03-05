const mongoose = require('mongoose');

const QuestionInfo = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    },
    choices: [{
        type: String,
        require: true
    }]
  }, {collection: "QuestionInfo"});

module.exports = mongoose.model('Question', QuestionInfo);