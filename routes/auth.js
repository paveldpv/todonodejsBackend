const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const mongodb = require('./../db/mongodb')
const key     = require('./../keys/jwt')

module.exports = function(app){
   app.post(`/auth`,async(req,res)=>{    
      let email    = req.body.email
      let password = req.body.password
      if(!await mongodb.checkEmail(email)){                    
         let candirate = await mongodb.getCanditdate(email)
         let resultCheckPassword = bcrypt.compareSync(password,candirate.password)
         if(resultCheckPassword){            
            let token =jwt.sign({
               email:candirate.email,
               id:candirate._id
            },key,{expiresIn:60*60})//первый паратмет информация которую кодируем ,вторая ..., третья время жизни токена в в секундах
            res.send(`Bearer ${token}`) 
         }
         else{
            res.send(`invalid password`)
         }
      }  
      else{
         res.send(`this email not found`)
      }

   })
}