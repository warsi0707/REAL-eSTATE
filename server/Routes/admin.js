const Router = require("express")
const adminRoute = Router()
const bcrypt = require("bcrypt")
const { User, Property, Admin, Contact } = require("../Database/DB")
const jwt = require("jsonwebtoken")
const { NODE_ENV, JWT_ADMIN_SECRETE } = require("../Config")
const { adminAuth } = require('../Middleware/auth.js')


//signup
adminRoute.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(404).json({
                message: "Every input required"
            })
        }
        const admin = await Admin.findOne({ username })
        if (admin) {
            return res.status(404).json({
                message: `${username}, is already signed up, Please login`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newAdmin = await Admin.create({
            username, password:hashPassword
        })
        return res.json({
            message: `${username} signup successfully`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
//signin
adminRoute.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username })
        const comparePassword = admin?bcrypt.compare(password, admin.password): false
        if (!admin || !comparePassword) {
            return res.status(404).json({
                message: `Username or Password incorrect `
            })
        }
        const adminToken = jwt.sign({
            adminId: admin._id
        }, JWT_ADMIN_SECRETE)
        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000,
            sameSite: NODE_ENV === "Development" ? "lax" : "none",
            secure: NODE_ENV === "Development" ? false : true
        })
        return res.json({
            message: `${username}, signin successfully`,
            adminToken: adminToken
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//auth verification
adminRoute.get("/verify", adminAuth, async (req, res) => {
    try {
        const adminId = req.user
        const admin = await Admin.findById(adminId)
        if (!admin) {
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
adminRoute.post("/property", adminAuth, async(req, res) =>{
    const {title, location, city, sizes, price, configurations, image, contact} = req.body;
    const adminId = req.user;
    try{
        if(!title, !location, !city, !sizes, !price, !configurations, !image, !contact){
            return res.status(500).json({
                message: "All inputs required!"
            })
        }
        const addData = await Property.create({
            title, location, city, sizes, price, configurations, image, contact, postedBy: adminId
        })
        if(addData){
            return res.status(200).json({
                message: "Property posted"
            })
        }
        return res.status(404).json({
           message: "Error while posting"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
   
})
//All property listed by the specefic owner
adminRoute.get("/property", adminAuth, async(req, res) =>{
    const adminId = req.user;
    try{
        const properties = await Property.find({postedBy: adminId})
        if(properties.length == 0){
            return res.status(404).json({
                message: "Property not listed "
            })
        }
        return res.status(200).json({
            properties: properties
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    } 
})
//edit property details
adminRoute.put("/property/:id", adminAuth, async(req, res) =>{
    const {id} = req.params;
    const adminId = req.user;
    const {title, price, image, contact } = req.body;
    try{
        const UpdateProperty = await Property.findByIdAndUpdate(id,{
            title, price, image, contact, postedBy: adminId
        })
        if(UpdateProperty){
            return res.status(200).json({
                updatedData: UpdateProperty
            })
        }
        return res.status(500).json({
            message: "Error while updating"
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
})
//delete property
adminRoute.delete("/property/:id", adminAuth, async(req, res) =>{
    const {id} = req.params;
    try{
        const deleteProperty = await Property.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Property Deleted!",
            deletedProperty: deleteProperty
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
    
})
//active users
adminRoute.get("/users",adminAuth, async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length < 0) {
            return res.json({
                message: "No active user "
            })
        }
        return res.json({
            users: users
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//queries
adminRoute.get("/contacts",adminAuth, async(req, res) =>{
    try{
        const allContacts = await Contact.find({})
        return res.status(200).json({
            contacts : allContacts
        })
    }catch(error){
        res.status(404).json({
            message: eror.message
        })
    }
})
adminRoute.get("/dashboard", adminAuth, async (req, res) => {
    try {
        const property = await Property.find({})
        const users = await User.find({})
        const city = property.map((city) => city.city)
        const locations = property.map((location) => location.location)
        if (property.length < 0) {
            return res.json({
                message: "No Property Available Now, Please add"
            })
        } else {
            return res.json({
                locations: locations.length,
                properties: property.length,
                users: users.length,
                city: city.length
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
adminRoute.post("/logout", async (req, res) => {
    try {
        res.clearCookie("adminToken",{
            httpOnly: true,
            sameSite: process.env.NODE_ENV ==="Development"? "lax": "none",
            secure: process.env.NODE_ENV==="Development"? false: true
        },JWT_ADMIN_SECRETE)
        return res.json({
            message: `Admin logout`,
            authenticated: false
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

module.exports = {
    adminRoute
}