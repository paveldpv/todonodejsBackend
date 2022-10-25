const mongoURL = require('./../keys/mongodbURL')
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const dbName = 'test';
mongoose.connect(`${mongoURL}/${dbName}`)

const schema = new Schema({  
  email:String,
  password:String,
  initialTodos:[{
    day:String,
    number:Number,
    tasks:[
      {
        task:String,
        id:String
      }
    ]
  }]
})
const User = mongoose.model(`users`,schema)


async function checkEmail(email){
 let result =  User.findOne({email:email})
 return (await result)?false:true
}
async function registrate(newUser){
  try {
    let result =  new User(newUser)
    await result.save()
    return true    
  } catch (error) {
    console.log(error);
    return false
  }
}
async function getCanditdate (email){
  return await User.findOne({email:email})
}
async function findID(id){
  
  return await User.findOne({_id:id})
}
async function getTodos(email){
  return await User.findOne({email:email})
}
async function addToDo(Numberday,task,email){
  try {
    let bd = await User.findOne({email:email})
    bd.initialTodos[Numberday].tasks.push(task)
    await bd.save()   
    return true    
  } catch (error) {
      console.log(error);
      return false
  }
}
async function removeToDo(id,number,email){
try {
  let res = await User.findOne({email:email})
  let indexRemove = res.initialTodos[number].tasks.findIndex(value=>value.id==id)
  res.initialTodos[number].tasks.splice(indexRemove,1)  
  await res.save()
  return true
} catch (error) {
  console.log(error);
  return false
}
}
async function redactTodo(id,text,email,day){
  try {
    let res =await User.findOne({email:email})
    let index =  res.initialTodos[day].tasks.findIndex(value=>value.id===id)
    res.initialTodos[day].tasks[index].task=text
    await res.save()
    return true

  } catch (error) {
    console.log(error);
    return false

  }

}




module.exports= {registrate,checkEmail,getCanditdate,findID,getTodos,addToDo,removeToDo,redactTodo}

