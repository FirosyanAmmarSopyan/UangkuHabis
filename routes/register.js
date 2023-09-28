const express = require('express')
const registerRoutes = express.Router()
const Controller = require('../controllers/controller')

registerRoutes.get('/' , Controller.renderRegister)
registerRoutes.post('/' , Controller.handlerRegister)



module.exports = registerRoutes