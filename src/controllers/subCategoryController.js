import { get } from "mongoose";
import SubCategory from "../models/subCategory.model.js";
import Category from "../models/category.model.js";
import mongoose from "mongoose";

// Create Sub-Category
export const createSubCategory = async (req, res) => {
  const { name, image, description, taxApplicable, tax, categoryId } = req.body;

  try {
    // Find the parent category to get default taxApplicability and tax if not provided
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const subCategory = new SubCategory({
      name,
      image,
      description,
      taxApplicable: taxApplicable ?? category.taxApplicable,
      tax: tax ?? category.tax,
      categoryId,
    });

    const savedSubCategory = await subCategory.save();
    res.status(201).json(savedSubCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all subcategories
export const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all subcategories under a specific category

export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const query = req.params;
    console.log("query", query);
    console.log(query);
    const subcategories = await SubCategory.find({
      categoryId: query.categoryId,
    });
    console.log(subcategories);
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get sub-category by id or name

export const getSubCategoryByIDOrName = async (req, res) => {
  try {
    const { idOrName } = req.params;
    console.log("Id or name :", idOrName);

    // Determine if the idOrName is a valid ObjectId or a name
    const query = mongoose.Types.ObjectId.isValid(idOrName)
      ? { _id: idOrName }
      : { name: idOrName };

    const subcategory = await SubCategory.findOne(query);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Subcategory
export const editSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedSubcategory = await SubCategory.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
