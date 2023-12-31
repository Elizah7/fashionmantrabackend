const express = require("express")
const cartModel = require("../models/cart.model");
const { auth } = require("../middlewares/auth");

const cartRoute = express.Router()

cartRoute.get("/",auth, async (req, res) => {
    const userId = req.body.userId
    console.log("get",userId)
    try {
        const data = await cartModel.find({userId})
        console.log(data)
        if(data.length>0){
            res.send({msg:"hihihi", Data: data });
        }
        else{
            res.send({msg:"No data found"})
        }
    } catch (e) {
        res.send({msg:e.message})
    }
})

cartRoute.post("/add",auth, async (req, res) => {
    req.body.payment = false
    req.body.dispatch = false
    req.body.count = 1
    const payload = req.body
    console.log(payload)
    try {
        const newProduct = new cartModel(payload);
        await newProduct.save()
        res.send({ msg: "Product Saved", newProduct: newProduct })
    } catch (e) {
        res.send({ "msg": e.message })
    }
})

cartRoute.patch("/update/:id",auth, async (req, res) => {
    const payload = req.body
    const id = req.params.id;
    try {
        await cartModel.findByIdAndUpdate(id, { ...payload });
        let UpdateProduct = await cartModel.findById(id)
        res.send({ msg: "Cart Updated", UpdateProduct: UpdateProduct })
    } catch (e) {
        res.send({ "msg": e.message })
    }
})

cartRoute.delete("/delete/:id",auth, async (req, res) => {
    const id = req.params.id;
    try {
        await cartModel.findByIdAndDelete(id);
        res.send({ msg: "Product Deleted" })
    } catch (e) {
        res.send({ "msg": e.message })
    }
})

module.exports = cartRoute