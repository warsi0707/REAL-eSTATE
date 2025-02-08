const Router = require("express")
const { SignupValidation, SigninValidation } = require("../Middleware/validation");
const { User, Contact, Admin, Review, Property } = require("../Database/DB");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRETE } = require("../Config");
const { userAuth } = require("../Middleware/auth");
const userRouter = Router()

//user signup
userRouter.post("/signup",async(req, res)=>{
    const {username, password} = req.body;
    try{
        if(!username || !password ){
            return res.status(404).json({
                message: "All input required"
            })
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(404).json({
                message: `${username} already exist`
            })
        }
        const hashPassword = await bcrypt.hash(password,5)
        const newUser = await User.create({
            username,
            password: hashPassword
        })
        return res.json({
            message: "User signup successfully",
            user: newUser
        })

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }

})
//user signin
userRouter.post("/signin",async(req, res)=>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({
                message:"Username not found"
            })
        }
        const comparePassword = user?bcrypt.compare(password, user.password): false
        if(!comparePassword){
            return res.status(404).json({
                message: "Incorrect password"
            })
        }
        const userToken =  jwt.sign({
            id: user._id
        },JWT_USER_SECRETE)
        res.cookie("userToken", userToken,{
            httpOnly: true,
            maxAge: 7 * 24 * 60* 60 * 1000,
            sameSite: process.env.NODE_ENV ==="Development"? "lax": "none",
            secure: process.env.NODE_ENV==="Development"? false: true
        })
        return res.json({
            message: "Signin success",
            token: userToken
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    } 
})
//login verification
userRouter.get("/verify",userAuth,async(req,res)=>{
    try{
        const id = req.user 
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                userAuthenticated: false
            })
        }
        return res.json({
            userAuthenticated:true
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
//user logout
userRouter.post("/logout",(req, res) =>{
    try{
        res.clearCookie("userToken",{
            httpOnly: true,
            sameSite: process.env.NODE_ENV ==="Development"? "lax": "none",
            secure: process.env.NODE_ENV==="Development"? false: true
        },JWT_USER_SECRETE)
        return res.json({
            message: "Logout successfully",
            userAuthenticated: false
        })

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/contact",async(req, res)=>{
    const {name, email, phone} = req.body;
    try{
        const contact = await Contact.create({
            name, email, phone
        })
        return res.json({
            query: contact
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/rate/:id",userAuth, async(req, res)=>{
    const userId = req.user;
    const {id} = req.params;
    const {rating} = req.body
    console.log(rating)
    const review = await Property.findByIdAndUpdate(id, {
        $push: {
           rating: {
            user: userId,
            rating: rating
           }
        }
    })
    res.json({
        rate: review
    })
})

userRouter.post("/contact", async(req, res) =>{
    const {name, email, phone} = req.body;

    const contactss = await Contact.create({ name,
        email,
        phone})
    res.json({
        message : "Message sent"
    })
})

module.exports = {
    userRouter:userRouter
}