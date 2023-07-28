const express = require(`express`)
const app = express()
const dotenv = require(`dotenv`);
const db = require(`./db`)
const cors = require('cors')


dotenv.config({path : './config/.env'})

const port = process.env.PORT || 7000

const authRouter = require(`./routes/auth`)

app.use(cors())
app.use(express.json())

app.use(`/`, authRouter)


app.listen(port, ()=>{
    console.log(`server is running at port ${port}.`)
})


