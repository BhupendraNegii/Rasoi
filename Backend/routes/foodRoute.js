import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodControllers.js";
import multer from "multer";

const FoodRouter = express.Router();

//Image Storeage Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

FoodRouter.post("/add", uploads.single("image"), addFood);
FoodRouter.get("/list" , listFood);
FoodRouter.post("/remove", removeFood);


export default FoodRouter;
