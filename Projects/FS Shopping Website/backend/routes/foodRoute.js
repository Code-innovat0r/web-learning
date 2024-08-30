import express from 'express';
import { addFood, listfood, removeFood } from '../controllers/foodControllers.js';
import multer from 'multer';


const foodRouter = express.Router();

//Image store engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage});
//----------------------------------------------------------------

//add the image store to the api
foodRouter.post("/add", upload.single("image") ,addFood)
foodRouter.get("/list", listfood)
foodRouter.post("/remove", removeFood) 



export default foodRouter;