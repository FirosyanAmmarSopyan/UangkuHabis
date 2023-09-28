const express = require('express')
const loginRoutes = express.Router()
const Controller = require('../controllers/controller')

loginRoutes.get('/' , Controller.renderLogin)



module.exports = loginRoutes