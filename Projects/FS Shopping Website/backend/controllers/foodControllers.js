import foodModel from "../models/foodModel.js";
import fs from "fs";


//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try{
        await food.save()
        res.json({success:true, message:"Food Added successfully"})
    }catch(err){
        console.log(err)
        res.json({success:false, message:"Error"})
    }

}

//get all food items in the database

const listfood = async (req, res) => {
    try {
        let datas = await foodModel.find({})
        res.json({ success: true, data: datas })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//delete food item
const removeFood = async (req, res) => {
    try {
        let food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Food deleted unsuccessfully" });
    }
}

export {addFood, listfood, removeFood}