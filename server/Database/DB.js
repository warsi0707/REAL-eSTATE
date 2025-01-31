const mongoose = require("mongoose")


const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: String,
    // contacts : [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : "Contact"
    // }],
    postedProperty : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }
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
    postedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }],
    location: String,
    city: String,
    sizes: String,
    price: Number,
    configurations: Number,
    image: String,
    contact: String,
    date: {
        type: Date
    },
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Number
})

const Admin = mongoose.model("Admin", AdminSchema)
const Contact = mongoose.model("Contact", ContactSchema)
const User = mongoose.model("User", UserSchema)
const Property = mongoose.model("Property", PropertySchema)
const Review = mongoose.model("Review", ReviewSchema)



module.exports = {
    Admin,
    User,
    Property,
    Review,
    Contact
}