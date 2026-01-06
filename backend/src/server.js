import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

// configure env variables
dotenv.config();

// create express app
const app = express();

// to handle json data
const __dirname = path.resolve();

// get port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(express.json()); // req.body

// middlewares
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use( (req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
  });

    app.get("/", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// start server
app.listen(PORT, () => {
     console.log("Server is running on port:" + PORT)
     connectDB();
});
