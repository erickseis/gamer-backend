const express = require('express')

// Controllers
const {
    createGame,
    getAllGames,
    updateGameById,
    deleteGameById,
    assignGameToConsole,
} = require('../controllers/games.controller')

const { createReview } = require('../controllers/reviews.controller')

// Middlewares
const { gameExists } = require('../middlewares/games.middlewares')
const { consoleExists } = require('../middlewares/consoles.middlewares')

const { protectSession } = require('../middlewares/auth.middlewares')

// Validators
const {
    createGameValidators,
    updateGameValidators,
    createReviewValidators,
} = require('../middlewares/validators.middlewares')

const gamesRouter = express.Router()

gamesRouter.get('/', getAllGames)

gamesRouter.use(protectSession)

gamesRouter.post('/', consoleExists, createGameValidators, createGame)

gamesRouter.patch('/:id', gameExists, updateGameValidators, updateGameById)

gamesRouter.delete('/:id', gameExists, deleteGameById)

gamesRouter.post(
    '/reviews/:gameId',
    gameExists,
    createReviewValidators,
    createReview
)

gamesRouter.post('/consoles/:consoleId', consoleExists, assignGameToConsole)

module.exports = { gamesRouter }
