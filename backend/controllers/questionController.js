const asyncHandler = require('express-async-handler')
const Info = require('../models/questionModel')
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getQuestion = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    const count = await Info.countDocuments({ user: req.user.id });
    if (count === 0) {
        res.status(404).json({ message: 'No questions found for this user' });
        return;
    }
    const random = Math.floor(Math.random() * count);
    const question = await Info.findOne({ user: req.user.id }).skip(random);

    if (!question) {
        res.status(404).json({ message: 'Question not found' });
    } else {
        res.status(200).json(question);
    }
})

const createQuestions = asyncHandler(async (req, res) => {
    const { question } = req.body
    const userId = req.user.id
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Create 5 multiple choice questions about ${question}. Do not bold anything and format the each question like this: Question 1: Which of these is a vegetable\nA) Apple\nB) Orange\nC) Broccoli\nD) Pear\nAnswer: C`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const questionBlocks = text.split('Question ').slice(1);

        let questions = [];
        let allAnswers = [];
        let correctAnswers = [];

        for (let block of questionBlocks) {
            const questionParts = block.split('\n');
            let questionText = questionParts[0].substring(questionParts[0].indexOf(':') + 1).trim();
            if (questionText.startsWith("** ")) {
                questionText = questionText.substring(3);
            }
            questions.push(questionText);

            const answers = questionParts.slice(1, 5);
            allAnswers.push(answers);

            const correctAnswerLetter = questionParts[5].split(': ')[1];
            const correctAnswerText = answers.find(ans => ans.startsWith(correctAnswerLetter + ')')).trim();
            correctAnswers.push(correctAnswerText);
            await Info.create({
                user: userId,
                question: questionText,
                answer: correctAnswerText,
                choices: answers
            });
        };

        const apiRes = {
            questions: questions,
            answers: allAnswers,
            correct: correctAnswers
        };
        res.status(201).json(apiRes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Failed to create question' });
    }
})

module.exports = {
    getQuestion,
    createQuestions
}