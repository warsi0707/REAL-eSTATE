const Router = require("express")
const userRoute = Router()
const bcrypt = require("bcrypt")
const { User, Property,  Contact } = require("../Database/DB.js")
const jwt = require("jsonwebtoken")
const { NODE_ENV,  JWT_USER_SECRETE } = require("../Config.js")
const {  userAuth } = require('../Middleware/auth.js')


//signup
userRoute.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(404).json({
                message: "Every input required"
            })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(404).json({
                message: `${username}, is already signed up, Please login`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        await User.create({
            username, password: hashPassword
        })
        return res.json({
            message: `signup success`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
//signin
userRoute.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username })
        const user = findUser ?await bcrypt.compare(password,findUser.password) : false
        if (!user) {
            return res.status(404).json({
                message: `Username or Password incorrect `
            })
        }
        const token = jwt.sign({
            id: findUser._id
        },  JWT_USER_SECRETE)
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: NODE_ENV === "Development" ? "lax" : "none",
            secure: NODE_ENV === "Development" ? false : true
        })
        return res.json({
            message: `signin success`,
            token: token
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//auth verification
userRoute.get("/verify", userAuth, async (req, res) => {
    try {
        const userId = req.user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                authenticated: false
            })
        }
        return res.json({
            authenticated: true,
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//post the property
userRoute.post("/property", userAuth, async (req, res) => {
    const { title, location, city, sizes, price, bhk, image, area } = req.body;
    const userId = req.user;
    try {
        if (!title, !location, !city, !sizes, !price, !image) {
            return res.status(500).json({
                message: "All inputs required!"
            })
        }
        const addData = await Property.create({
            title, 
            location, 
            city, 
            price, 
            bhk, 
            image, 
            postedBy: userId, 
            date: Date.now(), 
            sizes, 
            area, 
            launchDate: Date.now(),
            posessionStart: Date.now()
        }
        )
        if (addData) {
            return res.status(200).json({
                message: "Property posted"
            })
        }
        return res.status(404).json({
            message: "Error while posting"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//All property listed by the specefic owner
userRoute.get("/property", userAuth, async (req, res) => {
    const userId = req.user;
    try {
        const properties = await Property.find({ postedBy: userId })
        if (properties.length == 0) {
            return res.status(404).json({
                message: "Property not listed "
            })
        }
        return res.status(200).json({
            properties: properties
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//Get by id
userRoute.get("/property/:id", userAuth, async (req, res) => {
    const userId = req.user;
    const { id } = req.params;
    try {
        const properties = await Property.findById(id).populate('postedBy','username')
        if (!properties) {
            return res.status(404).json({
                message: "Property not listed "
            })
        }
        return res.status(200).json({
            properties: properties
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//edit property details
userRoute.put("/property/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user;
    const { title, price, image, } = req.body;
    try {
        const UpdateProperty = await Property.findByIdAndUpdate(id, {
            title, price, image, postedBy: userId
        })
        if (UpdateProperty) {
            return res.status(200).json({
              message: "Update successfull"
            })
        }
        return res.status(500).json({
            message: "Error while updating"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
//delete property
userRoute.delete("/property/:id", userAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user;
    try {
        const deleteProperty = await Property.findByIdAndDelete(id,{postedBy: userId})
        if(deleteProperty){
            return res.status(200).json({
                message: "Property Deleted!"
            })
        }
        return res.status(404).json({
            message: " Deleted Fialed"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

//contacts
userRoute.get("/contact", userAuth, async (req, res) => {
    //check for the postedby if the login user is posted owner then show only that listing contacts
    try {
        const allContacts = await Contact.find({}).populate('property','title')
        return res.status(200).json({
            contacts: allContacts
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//delete contacts
userRoute.delete("/contact/:id", userAuth, async(req, res)=>{
    const userid = req.user;
    const {id} = req.params;

    try{
        const delteContact = await Contact.findByIdAndDelete(id)
        if(delteContact){
            return res.json({
                delteContact: delteContact,
                message: "Contact deleted"
            })
        }else{
            return res.json({
                message: "Deletation failed"
            })
        }
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
userRoute.post("/logout", userAuth,async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }, JWT_USER_SECRETE)
        return res.json({
            message: `logout`,
            authenticated: false
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

module.exports = {
    userRoute
}