const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/user.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

dotenv.config({ path: './config.env' })

const protectSession = catchAsync(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1] // -> [Bearer, token]
    }

    if (!token) {
        return next(new AppError('The token was invalid', 403))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
    })

    if (!user) {
        return next(
            new AppError('The owner of the session is no longer active', 403)
        )
    }

    req.sessionUser = user
    next()
})

const protectUsersAccount = (req, res, next) => {
    const { sessionUser, user } = req

    if (sessionUser.id !== user.id) {
        return next(new AppError('You are not the owner of this account.', 403))
    }

    next()
}

module.exports = {
    protectSession,
    protectUsersAccount,
}
