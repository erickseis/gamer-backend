// Models
const { Console } = require('../models/console.model')
const { Game } = require('../models/game.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const getAllConsoles = catchAsync(async (req, res, next) => {
    const consoles = await Console.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: {
            model: Game,
            where: { status: 'active' },
            required: false,
            attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
            through: { attributes: [] },
        },
    })

    res.status(200).json({
        status: 'success',
        data: { consoles },
    })
})

const createConsole = catchAsync(async (req, res, next) => {
    const { name, company } = req.body

    const newConsole = await Console.create({
        name,
        company,
    })

    res.status(201).json({
        status: 'success',
        data: { newConsole },
    })
})

const updateConsoleById = catchAsync(async (req, res, next) => {
    const { name } = req.body
    const { console } = req

    await console.update({ name })

    res.status(200).json({
        status: 'success',
        data: { console },
    })
})

const deleteConsoleById = catchAsync(async (req, res, next) => {
    const { console } = req

    await console.update({ status: 'deleted' })

    res.status(204).json({
        status: 'success',
    })
})

module.exports = {
    getAllConsoles,
    createConsole,
    updateConsoleById,
    deleteConsoleById,
}
