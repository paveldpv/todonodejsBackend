const bcrypt  = require('bcryptjs')
const mongodb = require('./../db/mongodb')


module.exports = function(app){
   app.post(`/registrate`, async(req,res)=>{      
      let salt     = bcrypt.genSaltSync(10)
      let email    = req.body.email
      let password = req.body.password
            if(await mongodb.checkEmail(email)){         
         let user={
            email:email,
            password:bcrypt.hashSync(password,salt)
         }
         
         await mongodb.registrate(user)         
        res.send(`Registrate comlited`)
      }
      else{
         res.send(`This users exist`)
      }      
   })
}