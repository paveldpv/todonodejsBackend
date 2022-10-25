const passport  = require(`passport`)
const mongodb = require('./../db/mongodb')
const jwt     = require('jsonwebtoken')
//весь функционал по работе с TODOщками вынесен в один файл ( тк проект не сложный - считаю не стоит плодить сущности)

module.exports = function(app){
   app.post(`/todos`,passport.authenticate(`jwt`,{session:false}),async(req,res)=>{
      const [bearer,key]=req.headers.authorization.split(` `)
      const email =jwt.decode(key).email        
      let result = await mongodb.getTodos(email)  
      res.send(result.initialTodos)
   })
   app.post(`/settodo/add`,passport.authenticate(`jwt`,{session:false}),async(req,res)=>{      
      const [bearer,key]=req.headers.authorization.split(` `)               
      let numberDay = req.body.numberDay
      let task      = req.body.task
      let email     = jwt.decode(key).email   
      let result    = await mongodb.addToDo(numberDay,task,email)
      res.json({
         success:result,
         message:result?`task add to DB`:`error`
      })

      
   })
   app.post('/settodo/remove',passport.authenticate(`jwt`,{session:false}),async(req,res)=>{
      const [bearer,key]=req.headers.authorization.split(` `)
      
      let idRemove  = req.body.id
      let numberDay = req.body.numberDay
      let email     = jwt.decode(key).email      
      let result =await  mongodb.removeToDo(idRemove,numberDay,email)
      res.json({
         success:result,
         message:result?`remove task`:`error`
      })
      
   })
   app.post('/settood/redact',passport.authenticate(`jwt`,{session:false}),async(req,res)=>{
      const [bearer,key]=req.headers.authorization.split(` `)
      let id = req.body.id
      let text = req.body.text
      let email = jwt.decode(key).email 
      let day = req.body.numberday      
      let result = await mongodb.redactTodo(id,text,email,day)
      res.json({
         success:result,
         message:result?`redact task completed`:`error`
      })
   })
}