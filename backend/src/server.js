import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path"


import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


// Middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(
    cors({
        origin: "http://localhost:5173",
    }));
} 

app.use(express.json()); // This middleware will parse JSON Bodies: req.body
app.use(rateLimiter);

// Fim dos middlewares.


app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get(/^(?!\/api\/).*$/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});

