const express = require('express')
const passport = require('passport')
const cors = require('cors')

const app  = express()
const PORT =  3200

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(passport.initialize())
app.use(express.json());
app.use(express.urlencoded());

require('./routes')(app)
require('./middleware/passport')(passport)


app.listen(PORT,()=>{
  console.log(`app run, port => ${PORT}`);
})