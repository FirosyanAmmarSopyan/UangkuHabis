const express = require('express')
const buyerRoutes = express.Router()
const Controller = require('../controllers/controller')

buyerRoutes.use((req, res, next) => {
    if(req.session.userId){
        next()
    }else{
        const error = 'Login dulu mase mbae'
        res.redirect(`/login?error=${error}`)
    }
    console.log('Time:', Date.now())
  })

buyerRoutes.get('/home' , Controller.renderBuyerHome)
buyerRoutes.get('/profile/:id' , Controller.renderProfile)
buyerRoutes.get('/transaction/:id' , Controller.renderTransaction)
buyerRoutes.post('/transaction/:id' , Controller.handlerTransaction)

module.exports = buyerRoutes 