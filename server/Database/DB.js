const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username: { type: String, unique: String, required: true },
    password: String,
    property : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }]
})
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: String,
    phone: String,
    property : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }
})


const PropertySchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: String,
    city: String,
    price: Number,
    bhk: Number,
    image: String,
    date: Date,
    sizes: String,
    area: String,
    launchDate: String,
    startDate: String,
    // rating: [
    //     {
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User"
    //         },
    //         rating: Number
    //     }
    // ],
    contacts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }]
})

const Contact = mongoose.model("Contact", ContactSchema)
const User = mongoose.model("User", UserSchema)
const Property = mongoose.model("Property", PropertySchema)

module.exports = {
    User,
    Property,
    Contact
}