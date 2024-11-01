const Router = require("express")
const { Property } = require("../Database/DB")
const { userAuth, adminAuth } = require("../Middleware/auth")
const propertyRoute = Router()


propertyRoute.get("/", async (req, res) => {
    try {
        const allProperty = await Property.find({})
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
                { city: { $regex: query, $options: "i" } }
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

propertyRoute.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findById(id)
        return res.json({
            property: property
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
propertyRoute.post("/add", userAuth, async (req, res) => {
    try {
        const { title, description, location, city, area, price, beds, image, contact } = req.body;
        if (!title || !description || !image || !city || !contact || !location || !area || !price || !beds) {
            return res.status(404).json({
                message: "All input required"
            })
        }
        const property = await Property.findOne({ title })
        if (property) {
            return res.json({
                message: `${title} already exist`
            })
        }
        const newProperty = await Property.create({
            title,
            description,
            location,
            area,
            city,
            price,
            beds,
            image,
            contact
        })
        if (!newProperty) {
            return res.status(404).json({
                message: "Something error occured while adding property"
            })
        } else {
            return res.json({
                message: "Property added successfully",
                properties: newProperty
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})
propertyRoute.put("/:id", adminAuth, async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, image, contact } = req.body;
        if (!title || !description || !image || !contact) {
            return res.json({
                message: "All input required"
            })
        }
        const property = await Property.findByIdAndUpdate({ _id: id }, {
            title: title,
            description: description,
            image: image,
            contact: contact
        })
        if (property) {

        }
        return res.json({
            message: "Property updated "
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
propertyRoute.delete("/:id", adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findByIdAndDelete({ _id: id })
        return res.json({
            message: "Property deleted",
            deleted: property
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})


module.exports = {
    propertyRoute
}