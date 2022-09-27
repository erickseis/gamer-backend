const express = require('express')

// Controllers
const {
    getAllConsoles,
    createConsole,
    updateConsoleById,
    deleteConsoleById,
} = require('../controllers/consoles.controller')

// Middlewares
const { consoleExists } = require('../middlewares/consoles.middlewares')
const { protectSession } = require('../middlewares/auth.middlewares')

// Validators
const {
    createConsoleValidators,
    updateConsoleValidators,
} = require('../middlewares/validators.middlewares')

const consolesRouter = express.Router()

consolesRouter.get('/', getAllConsoles)

consolesRouter.use(protectSession)

consolesRouter.post('/', createConsoleValidators, createConsole)

consolesRouter.patch(
    '/:id',
    consoleExists,
    updateConsoleValidators,
    updateConsoleById
)

consolesRouter.delete('/:id', consoleExists, deleteConsoleById)

module.exports = { consolesRouter }
