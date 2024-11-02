const Router = require("express")
const { SignupValidation, SigninValidation } = require("../Middleware/validation");
const { User } = require("../Database/DB");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRETE } = require("../Config");
const { userAuth } = require("../Middleware/auth");
const userRouter = Router()

userRouter.post("/signup",async(req, res)=>{
    const {email, password, name, mobile} = req.body;
    try{
        if(!email || !password || !name || !mobile){
            return res.status(404).json({
                message: "All input required"
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(404).json({
                message: `${email} already exist`
            })
        }
        const hashPassword = await bcrypt.hash(password,5)
        const newUser = await User.create({
            email,
            password: hashPassword,
            name,
            mobile
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
userRouter.post("/signin",async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"Incorrect Email, Please Provide Correct Email"
            })
        }
        const comparePassword =await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(404).json({
                message: "Incorrect password,  Please Provide Correct Password"
            })
        }
        const userToken =  jwt.sign({
            id: user._id
        },JWT_USER_SECRETE)
        res.cookie("userToken", userToken,{
            httpOnly: true,
            maxAge: 7 * 60* 60 * 1000,
            sameSite: process.env.NODE_ENV ==="Development"? "lax": "none",
            secure: process.env.NODE_ENV==="Development"? false: true
        })
        return res.json({
            message: "User signin successfully",
            token: userToken
        })

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
})
userRouter.get("/verify",userAuth,async(req,res)=>{
    try{
        const {id} = req.user 
        const user = await User.findById({_id:id})
        if(!user){
            return res.status(404).json({
                authenticated: false
            })
        }
        return res.json({
            authenticated:true,
            username: user.name
        })
        

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
userRouter.post("/logout",(req, res) =>{
    try{
        res.clearCookie("userToken",{
            httpOnly: true,
            sameSite: process.env.NODE_ENV ==="Development"? "lax": "none",
            secure: process.env.NODE_ENV==="Development"? false: true
        },JWT_USER_SECRETE)
        return res.json({
            message: "Logout successfully",
            authenticated: false
        })

    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
// userRouter.post("/review",(req, res)=>{
    
// })

module.exports = {
    userRouter:userRouter
}