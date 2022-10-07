

const registrate= require(`./registrate`)
const auth = require('./auth')
const todos = require(`./todos`)

module.exports=function(app){
   registrate(app),
   auth(app),
   todos(app)
}