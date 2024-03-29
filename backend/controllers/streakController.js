const asyncHandler = require('express-async-handler')
const Info = require('../models/userModel')

const getStreak = asyncHandler(async (req, res) => {
    const score = await Info.find({ _id: req.user.id})

    if (!score) {
        res.status(400)
        throw new Error('Score not found')
    }

    res.status(200).json(score)
})

const updateStreak = asyncHandler(async (req, res) => {
    const info = await Info.findOne({_id: req.user.id})

    if (!info) {
        res.status(400)
        throw new Error('Info not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (info._id.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedInfo = await Info.findOneAndUpdate({_id: req.user.id}, { $set: req.body }, {new: true})

    res.status(201).json(updatedInfo)
})

module.exports = {
    getStreak,
    updateStreak
}