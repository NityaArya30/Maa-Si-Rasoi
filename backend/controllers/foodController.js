import foodModel from "../models/foodModel.js";
import fs from "fs";

// ✅ Get all food list
const listFood = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        // Populate kitchen details
        const foods = await foodModel.find({})
            .populate("kitchen", "name") // ✅ only bring back kitchen name
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await foodModel.countDocuments();

        // Add displayName dynamically
        const formattedFoods = foods.map(food => ({
            ...food._doc,
            displayName: `${food.name} (${food.kitchen?.name || "Unknown"})`
        }));

        res.status(200).json({
            success: true,
            data: formattedFoods,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        });
    } catch (error) {
        console.error("Error fetching food list:", error);
        res.status(500).json({ success: false, message: "Server error while fetching food list" });
    }
};

// ✅ Add food
const addFood = async (req, res) => {
    try {
        if (!req.body.name || !req.body.price || !req.body.kitchen || !req.file) {
            return res.status(400).json({
                success: false,
                message: "All required fields (name, price, kitchen, image) must be provided"
            });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description || "",
            price: Number(req.body.price),
            kitchen: req.body.kitchen, // ✅ kitchenId instead of category string
            image: image_filename,
            rating: Number(req.body.rating) || 0
        });

        await food.save();

        // Re-fetch with populated kitchen
        const savedFood = await food.populate("kitchen", "name");

        res.status(201).json({
            success: true,
            message: "Food Added",
            data: {
                ...savedFood._doc,
                displayName: `${savedFood.name} (${savedFood.kitchen?.name || "Unknown"})`
            }
        });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Server error while adding food" });
    }
};

// ✅ Delete food
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Delete image if exists
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await foodModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Server error while removing food" });
    }
};

export { listFood, addFood, removeFood };
