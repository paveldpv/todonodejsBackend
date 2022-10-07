const passport  = require(`passport`)

module.exports = function(app){
   app.get(`/todos`,passport.authenticate(`jwt`,{session:false}),async(req,res)=>{
      res.send(`passport working`)
   })
}