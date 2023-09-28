const express = require('express')
const buyerRoutes = express.Router()
const Controller = require('../controllers/controller')

buyerRoutes.get('/home' , Controller.renderBuyerHome)
buyerRoutes.get('/profile/:id' , Controller.renderProfile)
buyerRoutes.get('/transaction/:id' , Controller.renderTransaction)

module.exports = buyerRoutes 