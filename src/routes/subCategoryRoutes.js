import express from "express";
import {
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryByIDOrName,
  createSubCategory,
  editSubcategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// Routes

// Create Sub-Category
router.post("/", createSubCategory);

// Get all sub-categories
router.get("/", getAllSubCategories);

// Get sub-categories by category
router.get("/category/:categoryId", getSubCategoriesByCategory);

// get sub-category by id or name
router.get("/:idOrName", getSubCategoryByIDOrName);

// Edit Subcategory
router.put("/:id", editSubcategory);

export default router;
