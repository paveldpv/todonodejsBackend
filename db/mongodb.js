const { MongoClient ,ObjectId} = require('mongodb');
const mongoURL        = require('./../keys/mongodbURL')

const url    = mongoURL;
const client = new MongoClient(url);


const dbName = 'test';

async function registrate(newUser){
   await client.connect()   
   const db         = client.db(dbName)
   const collection = db.collection(`users`)
   const addUser    = await collection.insertOne(newUser)
   console.log(`new Ueser`,addUser);
}

async function checkEmail(email){
  try {   
   await client.connect()
   const db    = client.db(dbName)   
   const colllection = db.collection(`users`)
   const results = await colllection.find({email:email}).toArray()
   return results.length===0?true:false  
  } catch (error) {
   console.log(err);
  }  
}

async function getCanditdate (email){
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`users`)
    let candidate = await collection.findOne({email})    
    return candidate
  } catch (error) {
    console.log(error);
  }
}

async function findID(id){
  try {
    await client.connect()
    const db = client.db(dbName)
    const colllection = db.collection(`users`)    
    let res = await colllection.findOne({_id:ObjectId(id)})
    return res
  } catch (error) {
    console.log(error);
  }
}

module.exports= {registrate,checkEmail,getCanditdate,findID}



// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db         = client.db(dbName);
//   const collection = db.collection('users');
  
//    const update = await collection.updateOne({name:`pavessdsl`},{ $push: { id: `tempNumber`} })
//    console.log(`ipdate=>`,update);

//   const preteData =await collection.find()
//   const data       = await collection.find({name:`pavessdsl`}).toArray()
//   console.log(data);

  

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());