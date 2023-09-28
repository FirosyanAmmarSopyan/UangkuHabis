const express = require('express')
const app = express()
const port = 3000
const loginRoutes = require('./routes/login')
const buyerRoutes = require('./routes/buyer')
const sellerRoutes = require('./routes/seller')
const registerRoutes = require('./routes/register')
const Controller = require('./controllers/controller')

app.set('view engine' , 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : false})) 

app.get('/' , Controller.landingPage)
app.use('/register' , registerRoutes)
app.use('/login' , loginRoutes)

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.use('/buyer' , buyerRoutes )
app.use('/seller' , sellerRoutes )

app.listen(port, () => {
  console.log(`I LOP YU ${port}`)
})