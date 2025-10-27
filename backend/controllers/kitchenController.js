import Kitchen from "../models/kitchenModel.js";
import fs from "fs";

// ✅ Get all kitchens
const listKitchens = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const kitchens = await Kitchen.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Kitchen.countDocuments();

        // Add displayName dynamically (useful for frontend dropdowns)
        const formattedKitchens = kitchens.map(kitchen => ({
            ...kitchen._doc,
            displayName: kitchen.name
        }));

        res.status(200).json({
            success: true,
            data: formattedKitchens,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        });
    } catch (error) {
        console.error("Error fetching kitchen list:", error);
        res.status(500).json({ success: false, message: "Server error while fetching kitchens" });
    }
};

// ✅ Add kitchen
const addKitchen = async (req, res) => {
    try {
        if (!req.body.name || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Both name and image are required"
            });
        }

        const image_filename = req.file.filename;

        const kitchen = new Kitchen({
            name: req.body.name.trim(),
            image: image_filename
        });

        await kitchen.save();

        const savedKitchen = {
            ...kitchen._doc,
            displayName: kitchen.name
        };

        res.status(201).json({ success: true, message: "Kitchen Added", data: savedKitchen });
    } catch (error) {
        console.error("Error adding kitchen:", error);
        res.status(500).json({ success: false, message: "Server error while adding kitchen" });
    }
};

// ✅ Delete kitchen
const removeKitchen = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Kitchen ID is required" });
        }

        const kitchen = await Kitchen.findById(id);

        if (!kitchen) {
            return res.status(404).json({ success: false, message: "Kitchen not found" });
        }

        // Delete image if exists
        const imagePath = `uploads/kitchens/${kitchen.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await Kitchen.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Kitchen Removed" });
    } catch (error) {
        console.error("Error removing kitchen:", error);
        res.status(500).json({ success: false, message: "Server error while removing kitchen" });
    }
};

export { listKitchens, addKitchen, removeKitchen };
