const express = require('express')
const loginRoutes = express.Router()
const Controller = require('../controllers/controller')

loginRoutes.get('/' , Controller.renderLogin)
loginRoutes.post('/' , Controller.handlerLogin)



module.exports = loginRoutes