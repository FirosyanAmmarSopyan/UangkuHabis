const express = require('express')
const sellerRoutes = express.Router()
const Controller = require('../controllers/controller')

sellerRoutes.use((req, res, next) => {
    if(req.session.userId){
        next()
    }else{
        const error = 'Login dulu mase mbae'
        res.redirect(`/login?error=${error}`)
    }
    console.log('Time:', Date.now())
  })
sellerRoutes.get('/home' , Controller.renderHomeSeller)



module.exports = sellerRoutes 