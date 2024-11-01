const mongoose = require("mongoose")


const AdminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    name: String,

})
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: String, required: true },
    password: String,
    name: String,
    mobile: String,
})

const PropertySchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    description: String,
    location: String,
    city: String,
    area: String,
    price: String,
    beds: String,
    image: String,
    contact: String,
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews"
    }]
})

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Number,
    comment: String
})

const Admin = mongoose.model("Admin", AdminSchema)
const User = mongoose.model("User", UserSchema)
const Property = mongoose.model("Property", PropertySchema)
const Review = mongoose.model("Review", ReviewSchema)



module.exports = {
    Admin,
    User,
    Property,
    Review
}