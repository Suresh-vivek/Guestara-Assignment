import express from "express";
import {
  getAllItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItemByIdOrName,
  createItem,
  editItem,
  searchItemByName,
} from "../controllers/itemController.js";

const router = express.Router();

// Routes

// Create Item
router.post("/", createItem);

// Get all items
router.get("/", getAllItems);

// Get items by category
router.get("/category/:categoryId", getItemsByCategory);

// Get items by sub-category
router.get("/subcategory/:subCategoryId", getItemsBySubCategory);

// search item by name
router.get("/search", searchItemByName);

// get item by id or name
router.get("/:idOrName", getItemByIdOrName);

// Edit Item
router.put("/:id", editItem);

export default router;
