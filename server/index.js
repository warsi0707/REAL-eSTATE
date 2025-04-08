require('dotenv').config()
const express = require("express")
const app = express()
const path = require("path")
const { default: mongoose } = require('mongoose')
const { MONGO_URL } = require('./Config')
const cookieParser = require('cookie-parser')
const cors = require("cors")

const { propertyRoute } = require('./Routes/property')
const { userRoute } = require('./Routes/user')

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.use("/api/v1/property", propertyRoute)
app.use("/api/v1/user", userRoute)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})
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