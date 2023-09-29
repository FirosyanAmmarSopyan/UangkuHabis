const {Product , Category , Profile , Transaction , User , ProductTransaction} = require('../models/index')
const { changeRupiah } = require('../helper/helper')
const { Op  , sequelize} = require("sequelize");
const bcrypt = require('bcryptjs')
const easyinvoice = require('easyinvoice');
const fs = require('fs');

class Controller {
    static landingPage(req , res){
      res.render('index')  
    }

    static renderLogin(req , res){
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
      .then(user => {        
        if(user){
          const isValidPassword = bcrypt.compareSync(password, user.password)
          if(isValidPassword){
            req.session.userId = user.id
            return res.redirect('/buyer/home')
          }else{
            const error = 'password or name is invalid'
            return res.redirect(`/login?error=${error}`)
          }
        }else{
          const error = 'password or name is invalid'
          return res.redirect(`/login?error=${error}`)
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
      .catch(err => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map((el) => el.message)
          res.render('registerPage', { errors, roleError: errors[0], usernameError: errors[1], passwordError: errors[2] });

          // res.send(errors)
        } else {
          res.send(err);
        }
      });
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
      Product.findOne({
        where  : {id : id} })
      .then((data) => {
        res.render('BuyerTransaction' , {data , changeRupiah})
        // res.send(data)
      })

    }

    static handlerTransaction(req, res){
      const ProductId = +req.params.id
      const UserId = req.session.userId
      const quantity = +req.body.quantity
      const totalPrice = +req.body.price * +quantity
      console.log(totalPrice)
      let result
      Transaction.create({quantity, totalPrice: totalPrice, UserId})
      .then((data) => {
        const TransactionId = data.id
        return ProductTransaction.create({TransactionId, ProductId})
      })
      .then((data)=>{
        const TransactionId = data.TransactionId
        return Product.findOne({
          include: {
            model: Transaction,
            where:{
              id: TransactionId
            }
          },
          where: {
            id: data.ProductId
          }
        })
      })
      .then((data) => {        
        result = data
        return result.decrement('stock',{by: quantity})
        // res.send(user)
      })
      .then(() => {        
        return Profile.findByPk(UserId)
      })
      .then(user => {
        // res.send(result)  
        res.render('transactionProduct', { result, user })
      })

        
      .catch(err => res.send(err))
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

    static logout(req, res){
      req.session.destroy(err => {
        if(err) res.send(err)
        else{
          res.redirect('/login')
        }
      })
    }
}

module.exports = Controller