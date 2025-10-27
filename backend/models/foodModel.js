import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        image: { type: String, required: true },
        kitchen: { type: mongoose.Schema.Types.ObjectId, ref: "Kitchen", required: true }, // ✅ Reference
        rating: { type: Number, default: 0, min: 0, max: 5 }
    },
    { timestamps: true }
);

const foodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default foodModel;
