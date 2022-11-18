const express = require('express')
const router = express.Router()

const gameController = require('../controller/gameController')
gameController(router)

module.exports = router