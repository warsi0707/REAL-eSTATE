const mongoose = require("mongoose")
const { number, string } = require("zod")


const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: String, 
})
const ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: String,
    phone: String
})
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: String, required: true },
    password: String
})

const PropertySchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    location: String,
    city: String,
    price: Number,
    bhk: Number,
    image: String,
    date: Date,
    sizes: String,
    area: String,
    launchDate : String,
    startDate : String,
    rating: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            rating: Number
        }
    ]
})
const Admin = mongoose.model("Admin", AdminSchema)
const Contact = mongoose.model("Contact", ContactSchema)
const User = mongoose.model("User", UserSchema)
const Property = mongoose.model("Property", PropertySchema)

module.exports = {
    Admin,
    User,
    Property,
    Contact
}