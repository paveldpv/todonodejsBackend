const express = require('express')
const passport = require('passport')

const app  = express()
const PORT =  3200

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','DELETE','GET','POST');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials',true);  
  next()
})
app.use(passport.initialize())
app.use(express.json());
app.use(express.urlencoded());

require('./routes')(app)
require('./middleware/passport')(passport)


app.listen(PORT,()=>{
  console.log(`app run, port => ${PORT}`);
})