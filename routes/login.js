const express = require('express')
const loginRoutes = express.Router()
const Controller = require('../controllers/controller')

loginRoutes.get('/' , Controller.renderLogin)
loginRoutes.post('/' , Controller.handlerLogin)

loginRoutes.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

module.exports = loginRoutes