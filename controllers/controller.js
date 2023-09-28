const {Product , Category , Profile , Transaction , User , ProductTransaction} = require('../models/index')
const changeRupiah = require('../helper/helper')
const { Op  , sequelize} = require("sequelize");
const bcrypt = require('bcryptjs')

class Controller {
    static landingPage(req , res){
      res.render('index')  
    }

    static renderLogin(req , res){
      console.log(req.query,`<<< RENDER LOGIN REQ QUERY`)
      const error = req.query.error
      res.render('loginPage', {error})
    }

    static handlerLogin(req , res){
      const { username, password } = req.body
      User.findOne({
        where: {
          username
        }
      })
      .then(data => {
        console.log(data)
        if(data){
          const isValidPassword = bcrypt.compareSync(password, data.password)
          console.log(isValidPassword,`isTRUEEE????`)
          const error = 'password or name is invalid'
          if(isValidPassword){
            res.redirect('/buyer/home')
          }else{
            res.redirect(`/login?error=${error}`)
          }
        }else{

        }
        
      })
      .catch(err => res.send(err))
    }

    static renderRegister(req , res){
      res.render('registerPage')
    }

    static handlerRegister(req, res){
      const { name, birthOfDate, gender, username, password, roles } = req.body
      User.create({username, password, roles})      
      .then((data) => {
        const UserId = data.id
        return Profile.create({name, birthOfDate, gender, UserId})
      })
      .then(() => {
        res.redirect('/login')
      })
      .catch(err => res.send(err))
    }

    static renderBuyerHome(req , res){
      const { search } = req.query;

      const options = {};
    
      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
  
  
      Product.findAll(options)
      .then((data) => {
        res.render('buyerHome' ,{data , changeRupiah})
      })
      .catch((err) => res.send(err))
    }
    static renderTransaction(req , res){
      const id = req.params.id
      console.log(req.query,`<<<QUERY`)
      Product.findOne({where  : {id : id} })
      .then((data) => {
        res.render('BuyerTransaction' , {data , changeRupiah})
        // res.send(data)
      })

    }

    static renderProfile(req , res){
      // const id = req.params.id
      Profile.findAll()
      .then((data) => {
        res.render('profilePage' , {data , changeRupiah})
      })
      .catch((err) => res.send(err))
    } 

    static renderHomeSeller(req , res) {
        res.render('sellerHomePage')
    }
}

module.exports = Controller