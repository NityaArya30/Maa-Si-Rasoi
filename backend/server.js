import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import kitchenRouter from "./routes/kitchenRoute.js";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// ✅ Database connection
connectDB();

// ✅ Static file serving for uploads
// Example: http://localhost:4000/images/foods/xyz.png
// Example: http://localhost:4000/images/kitchens/abc.png
app.use("/images", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/kitchen", kitchenRouter);

// Default route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Server listen
app.listen(port, () =>
  console.log(`🚀 Server started on http://localhost:${port}`)
);
