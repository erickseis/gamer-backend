const { Review } = require('../models/review.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const createReview = catchAsync(async (req, res, next) => {
    const { comment } = req.body
    const { gameId } = req.params
    const userId = req.sessionUser.id

    const newReview = await Review.create({
        comment,
        gameId,
        userId,
    })

    res.status(201).json({
        status: 'success',
        data: { newReview },
    })
})

module.exports = { createReview }
