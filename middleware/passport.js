const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT  = require('passport-jwt').ExtractJwt
const mongodb = require('./../db/mongodb')
const keyJWT = require('./../keys/jwt')

const option ={
   jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
   secretOrKey:keyJWT
}

module.exports =passport=>{
   passport.use(
      new JWTStrategy(option,async(payload,done)=>{         
          try {
            const user  = await mongodb.findID(payload.id)
            const email = user.email
            const id    = user._id
            if(user){
               done(null,user)
            }
          else{
            done(null,false)
          }
          } catch (error) {
            console.log(`passport error(!)`,error);
          }
          
         
      })
   )
}