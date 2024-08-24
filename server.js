import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
dotenv.config();


const app = express();
const corsOption = {
    origin: "*"
}
app.use(cors(corsOption));
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Welcome to public api"
    })
});

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
dbConnection();
const PORT = 8091;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})