import mongoose from "mongoose";

const kitchenSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        image: { type: String, required: true },
        description: { type: String, trim: true },
        isActive: { type: Boolean, default: true },
        foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }] // optional relation
    },
    { timestamps: true }
);

const kitchenModel =
    mongoose.models.Kitchen || mongoose.model("Kitchen", kitchenSchema);

export default kitchenModel;
