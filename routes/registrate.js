const bcrypt  = require('bcryptjs')
const mongoosedb = require('./../db/mongodb')


const initialTodos=[
   {day:`Monday`,tasks:[{task:``,id:``}],number:0},
   {day:`Tuesday`,tasks:[{task:``,id:``}],number:1},
   {day:`Wednesday`,tasks:[{task:``,id:``}],number:2},
   {day:`Thursday`,tasks:[{task:``,id:``}],number:3},
   {day:`Friday`,tasks:[{task:``,id:``}],number:4},
   {day:`Saturday`,tasks:[{task:``,id:``}],number:5},
   {day:`Sunday`,tasks:[{task:``,id:``}],number:6}
]

module.exports = function(app){
   app.post(`/registrate`, async(req,res)=>{      
      let salt     = bcrypt.genSaltSync(10)
      let email    = req.body.email
      let password = req.body.password
      if(await mongoosedb.checkEmail(email)){         
         let user={email:email,
            password:bcrypt.hashSync(password,salt),
            initialTodos:initialTodos}     
           await mongoosedb.registrate(user)
         res.send(`completed registration`)
      }
      else{
         res.send(`This users exist`)
      }      
   })
}