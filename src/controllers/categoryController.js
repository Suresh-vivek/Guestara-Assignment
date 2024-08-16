import Category from "../models/category.model.js";
import mongoose from "mongoose";

// Create Category
export const createCategory = async (req, res) => {
  const { name, image, description, taxApplicable, tax, taxType } = req.body;

  try {
    const category = new Category({
      name,
      image,
      description,
      taxApplicable,
      tax,
      taxType,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get category by id or name
export const getCategoryByIDOrName = async (req, res) => {
  try {
    const { idOrName } = req.params;

    // Determine if the idOrName is a valid ObjectId or a name
    const query = mongoose.Types.ObjectId.isValid(idOrName)
      ? { _id: idOrName }
      : { name: idOrName };

    console.log("Query:", query);

    const category = await Category.findOne(query);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Category
export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
