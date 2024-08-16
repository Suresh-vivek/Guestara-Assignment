import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicable: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
});

const SubCategory = mongoose.model("Subcategory", subcategorySchema);

export default SubCategory;
