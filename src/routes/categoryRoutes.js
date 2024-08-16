import express from "express";
import {
  getAllCategories,
  getCategoryByIDOrName,
  createCategory,
  editCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Routes

// Create Category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

// get category by id or name
router.get("/:idOrName", getCategoryByIDOrName);

// Edit Category
router.put("/:id", editCategory);

export default router;
