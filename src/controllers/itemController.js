import Items from "../models/items.model.js";
import SubCategory from "../models/subCategory.model.js";
import Category from "../models/category.model.js";
import mongoose from "mongoose";

// Create Item
export const createItem = async (req, res) => {
  const {
    name,
    image,
    description,
    taxApplicable,
    tax,
    baseAmount,
    discount,
    subCategoryId,
    categoryId,
  } = req.body;

  try {
    let applicableTax = tax;

    if (subCategoryId) {
      // Check if item is associated with a sub-category
      const subCategory = await SubCategory.findById(subCategoryId).populate(
        "categoryId"
      );
      if (!subCategory)
        return res.status(404).json({ message: "Sub-Category not found" });

      applicableTax =
        taxApplicable ?? subCategory.taxApplicable ? tax ?? subCategory.tax : 0;
    } else if (categoryId) {
      // Check if item is associated with a category
      const category = await Category.findById(categoryId);
      if (!category)
        return res.status(404).json({ message: "Category not found" });

      applicableTax =
        taxApplicable ?? category.taxApplicable ? tax ?? category.tax : 0;
    } else {
      return res.status(400).json({
        message: "Either subCategoryId or categoryId must be provided",
      });
    }

    const totalAmount = baseAmount - discount;

    const item = new Items({
      name,
      image,
      description,
      taxApplicable: taxApplicable ?? applicableTax !== 0,
      tax: applicableTax,
      baseAmount,
      discount,
      totalAmount,
      subCategoryId,
      categoryId,
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Items.find();
    // .populate("subCategoryId")
    // .populate("categoryId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get items under a specific category
export const getItemsByCategory = async (req, res) => {
  try {
    const items = await Items.find({ categoryId: req.params.categoryId });
    // .populate("subCategoryId")
    // .populate("categoryId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get items under a specific sub-category
export const getItemsBySubCategory = async (req, res) => {
  try {
    const items = await Items.find({ subCategoryId: req.params.subCategoryId });
    // .populate("subCategoryId")
    // .populate("categoryId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get item by ID or Name
export const getItemByIdOrName = async (req, res) => {
  try {
    const { idOrName } = req.params;
    console.log("Id or name :", idOrName);

    // Determine if the idOrName is a valid ObjectId or a name
    const query = mongoose.Types.ObjectId.isValid(idOrName)
      ? { _id: idOrName }
      : { name: idOrName };

    const item = await Items.findOne(query)
      .populate("subCategoryId")
      .populate("categoryId");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit Item
export const editItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Calculate totalAmount if baseAmount or discount is being updated
    if (updates.baseAmount || updates.discount) {
      const baseAmount = updates.baseAmount || 0;
      const discount = updates.discount || 0;
      updates.totalAmount = baseAmount - discount;
    }

    const updatedItem = await Items.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchItemByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log("Name :", name);

    if (!name) {
      return res.status(400).json({ message: "Item name is required" });
    }

    // Perform a case-insensitive search
    const items = await Items.find({
      name: name,
    });

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
