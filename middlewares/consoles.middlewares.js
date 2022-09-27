// Models
const { Console } = require('../models/console.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const consoleExists = catchAsync(async (req, res, next) => {
    // This or (||) operator is for middleware works in createGame controller
    const id = req.params.id || req.params.consoleId || req.body.consoleId

    const console = await Console.findOne({
        where: { id, status: 'active' },
    })

    if (!console) {
        return next(new AppError('Console not found', 404))
    }

    req.console = console
    next()
})

module.exports = {
    consoleExists,
}
