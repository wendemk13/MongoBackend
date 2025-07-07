import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieparser from "cookie-parser";
import databaseConnect from "./config/db.js";
import AuthRoutes from "./routes/AuthRoute.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Do NOT use '*'
    credentials: true               // Allow cookies to be sent
}))

app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await databaseConnect(); // ✅ Ensure DB connection first
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit if DB connection fails
    }
};

startServer();
