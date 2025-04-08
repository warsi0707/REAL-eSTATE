const Router = require("express")
const { Property, Contact } = require("../Database/DB")
const { userAuth} = require("../Middleware/auth")
const propertyRoute = Router()

//all property
propertyRoute.get("/", async (req, res) => {
    try {
        const allProperty = await Property.find({})
        if (allProperty == null) {
            return res.json({
                message: "No property listed"
            })
        }
        return res.json({
            properties: allProperty
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//one property
propertyRoute.get("/one", async (req, res) => {
    try {
        const allProperty = await Property.find({}).limit(1)
        if (allProperty == null) {
            return res.json({
                message: "No property listed"
            })
        }
        return res.json({
            properties: allProperty
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//Three property
propertyRoute.get("/three", async (req, res) => {
    try {
        const allProperty = await Property.find({}).limit(3)
        if (allProperty == null) {
            return res.json({
                message: "No property listed"
            })
        }
        return res.json({
            properties: allProperty
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//starter porperty
propertyRoute.get("/item", async (req, res) => {
    try {
        const allProperty = await Property.find({}).limit(3)
        if (allProperty == null) {
            return res.json({
                message: "No property listed"
            })
        }
        return res.json({
            message: "All properties",
            properties: allProperty
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//search by 
propertyRoute.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        if (query.length === 0) {
            return res.status(404).json({
                message: "please provide some inputs"
            })
        }
        const properties = await Property.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { price: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } }
            ]
        })
        if (properties.length === 0) {
            return res.status(404).json({
                message: "NOT FOUND"
            })
        }
        return res.json({
            message: "Here is your serach items",
            property: properties
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
//property search by id
propertyRoute.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findById(id)
        const ammenties = property
        return res.json({
            property: property,
            ammenties: ammenties
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
propertyRoute.get("/ratings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const findReview = await Property.findById(id).populate({
            path: 'rating.user',
            select: 'username'
        })
        if (findReview == null) {
            return null
        }
        return res.json({
            review: findReview.rating.map((item) => item)
        })
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
})


propertyRoute.post("/contact/:id", async (req, res) => {
    const { name, message, phone } = req.body;
    const {id} = req.params;
    try {
        if (!name, !message, !phone) {
            return res.status(404).json({
                message: "All input required!"
            })
        }
        const contact =await Contact.create({
            name,
            message,
            phone,
            property: id
        })
        res.json({
            contact: contact,
            message: "Message sent. Seller will contact you",
        })
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
})

module.exports = {
    propertyRoute
}