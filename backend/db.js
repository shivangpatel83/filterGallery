const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);

dotenv.config({path : './config/.env'})
const mongo_uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ShivangDb"

mongoose.connect(mongo_uri)
.then(()=>{
    console.log(`Connected to database`)
})
.catch((e)=>{
    console.log(e)
})

const db = mongoose.connection

module.exports =  {db} 