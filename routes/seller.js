const express = require('express')
const sellerRoutes = express.Router()
const Controller = require('../controllers/controller')

sellerRoutes.get('/home' , Controller.renderHomeSeller)



module.exports = sellerRoutes 