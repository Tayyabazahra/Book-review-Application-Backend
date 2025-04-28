import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";
import cors from "cors";

// routes
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middleware/not-found.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const baseURL = "/api";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

app.use(notFoundHandler);

// Connect DB first, then start server
connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}!`));
  })
  .catch((error) => {
    console.log("Failed to connect to the database:", error);
  });
