const Router = require("express")
const adminRoute = Router()
const bcrypt = require("bcrypt")
const { User, Property, Admin } = require("../Database/DB")
const jwt = require("jsonwebtoken")
const { NODE_ENV, JWT_ADMIN_SECRETE } = require("../Config")
const { adminAuth } = require('../Middleware/auth.js')



adminRoute.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(404).json({
                message: "Every input required"
            })
        }
        const user = await Admin.findOne({ email })
        if (user) {
            return res.status(404).json({
                message: `${email}, is already signed up, Please login`
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await Admin.create({
            email, password: hashPassword, name
        })
        return res.json({
            message: `${email} signup successfully`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})
adminRoute.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email })
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!user || !comparePassword) {
            return res.status(404).json({
                message: `Email or Password incorrect `
            })
        }
        const adminToken = jwt.sign({
            id: user._id
        }, JWT_ADMIN_SECRETE)
        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000,
            sameSite: NODE_ENV === "Development" ? "lax" : "none",
            secure: NODE_ENV === "Development" ? false : true
        })
        return res.json({
            message: `${email}, signin successfully`,
            adminToken: adminToken
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
adminRoute.get("/verify", adminAuth, async (req, res) => {
    try {
        const { id } = req.user
        const user = await Admin.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                authenticated: false
            })
        }
        return res.json({
            authenticated: true,
            username: user.name
        })


    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
adminRoute.get("/users", async (req, res) => {
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
adminRoute.post("/logout", adminAuth, async (req, res) => {
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