const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    title:String,
    images:Object,
    rating:Number,
    count:Number,
    description:String,
    discount:String,
    off_price:Number,
    brand:String,
    color:String,
    sizes:Array,
    gender:String,
    price:String,
    size:String,
    categories:String,
    qty:String,
    userId:String,
    dispatch:Boolean,
    payment:Boolean,
    count:Number
})

const cartModel = mongoose.model("cartItem", cartSchema)
module.exports = cartModel