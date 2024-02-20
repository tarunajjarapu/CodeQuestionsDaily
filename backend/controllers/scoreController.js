const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Info = require('../models/scoreModel')

const getPoints = asyncHandler(async (req, res) => {
    const points = await Info.find({ user: req.user.id})

    if (!points) {
        res.status(400)
        throw new Error('Points not found')
    }

    res.status(200).json(points)
})

const updatePoints = asyncHandler(async (req, res) => {
    const info = await Info.findOne({user: req.user.id})

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
    if (info.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedInfo = await Info.findOneAndUpdate({user: req.user.id}, { $set: req.body }, {new: true})

    res.status(201).json(updatedInfo)
})

const getScore = asyncHandler(async (req, res) => {
    const score = await Info.find({ user: req.user.id})

    if (!score) {
        res.status(400)
        throw new Error('Score not found')
    }

    res.status(200).json(score)
})

const updateScore = asyncHandler(async (req, res) => {
    const info = await Info.findOne({user: req.user.id})

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
    if (info.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedInfo = await Info.findOneAndUpdate({user: req.user.id}, { $set: req.body }, {new: true})

    res.status(201).json(updatedInfo)
})

module.exports = {
    getPoints,
    updatePoints,
    getScore,
    updateScore
}