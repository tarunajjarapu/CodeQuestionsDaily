const asyncHandler = require('express-async-handler')
const Info = require('../models/questionModel')
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getQuestion = asyncHandler(async (req, res) => {
    const count = await Info.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Info.findOne().skip(random);

    if (!question) {
        res.status(401)
        throw new Error('Questions not found')
    }

    res.status(200).json(question)
})

const createQuestions = asyncHandler(async (req, res) => {
    const { question } = req.body
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Create 5 multiple choice questions about ${question}. Do not bold anything and format the each question like this: Question 1: Which of these is a vegetable\nA) Apple\nB) Orange\nC) Broccoli\nD) Pear\nAnswer: C`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const questionBlocks = text.split('Question ').slice(1); // Remove the first empty item if any

        // Arrays to hold the parsed data
        let questions = [];
        let allAnswers = [];
        let correctAnswers = [];

        questionBlocks.forEach(block => {
            // Extract the question text
            const questionParts = block.split('\n');
            let questionText = questionParts[0].substring(questionParts[0].indexOf(':') + 1).trim();
            if (questionText.startsWith("** ")) {
                questionText = questionText.substring(3);
            }
            questions.push(questionText);

            // Extract the answers
            const answers = questionParts.slice(1, 5); // Next four lines are the answers
            allAnswers.push(answers);

            // Extract the correct answer
            const correctAnswerLetter = questionParts[5].split(': ')[1]; // "Answer: X" is expected to be the part after the answers
            // Find the correct answer text by matching the letter with the answers array
            const correctAnswerText = answers.find(ans => ans.startsWith(correctAnswerLetter + ')')).trim();
            correctAnswers.push(correctAnswerText);
        });

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