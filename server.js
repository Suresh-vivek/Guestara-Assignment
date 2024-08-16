import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";

// Import routes
import categoryRoutes from "./src/routes/categoryRoutes.js";
import subCategoryRoutes from "./src/routes/subCategoryRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";

const app = express();

// Connecting Mongo Database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/items", itemRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
