require('dotenv').config()
const express = require("express")
const app = express()

const { default: mongoose } = require('mongoose')
const { MONGO_URL } = require('./Config')
const cookieParser = require('cookie-parser')
const cors = require("cors")

const { adminRoute } = require('./Routes/admin')
const { propertyRoute } = require('./Routes/property')
const { userRouter } = require('./Routes/user')

app.use(cookieParser())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))



app.use("/api/admin",adminRoute)
app.use("/api/property", propertyRoute)
app.use("/api/user", userRouter)



const Main =async()=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Databse connected")
        app.listen(3000)
        console.log("App running on port 3000")
    }catch(error){
        console.error(error)
    }
    
}
Main()