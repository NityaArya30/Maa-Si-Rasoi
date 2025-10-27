import express from "express";
import { addKitchen, listKitchens, removeKitchen } from "../controllers/kitchenController.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const kitchenRouter = express.Router();

// ✅ Ensure "uploads/kitchens" directory exists
const uploadDir = "uploads/kitchens";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg, .jpg, .png, .webp files are allowed!"));
        }
    }
});

// ✅ Routes
kitchenRouter.get("/listKitchen", listKitchens);
kitchenRouter.post("/addKitchen", upload.single("image"), addKitchen);
kitchenRouter.post("/removeKitchen", removeKitchen);

export default kitchenRouter;
