// Models
const { Game } = require('../models/game.model')
const { User } = require('../models/user.model')
const { Review } = require('../models/review.model')
const { Console } = require('../models/console.model')
const { GameInConsole } = require('../models/gameInConsole.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/appError.util')

const getAllGames = catchAsync(async (req, res, next) => {
    const games = await Game.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
        include: [
            {
                model: Console,
                attributes: { exclude: ['status', 'createdAt', 'updatedAt'] },
                through: { attributes: [] },
            },
            {
                model: Review,
                attributes: ['id', 'comment'],
                include: {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
            },
        ],
    })

    res.status(200).json({
        status: 'success',
        data: { games },
    })
})

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre, consoleId } = req.body

    const newGame = await Game.create({
        title,
        genre,
    })

    const gameInConsole = await GameInConsole.create({
        gameId: newGame.id,
        consoleId,
    })

    res.status(201).json({
        status: 'success',
        data: { newGame, gameInConsole },
    })
})

const updateGameById = catchAsync(async (req, res, next) => {
    const { title } = req.body
    const { game } = req

    await game.update({ title })

    res.status(200).json({
        status: 'success',
        data: { game },
    })
})

const deleteGameById = catchAsync(async (req, res, next) => {
    const { game } = req

    await game.update({ status: 'deleted' })

    res.status(204).json({ status: 'success' })
})

const assignGameToConsole = catchAsync(async (req, res) => {
    const { gameId } = req.body
    const { consoleId } = req.params

    const gameInConsole = await GameInConsole.create({ gameId, consoleId })

    res.status(201).json({
        status: 'success',
        data: { gameInConsole },
    })
})

module.exports = {
    createGame,
    getAllGames,
    updateGameById,
    deleteGameById,
    assignGameToConsole,
}
