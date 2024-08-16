import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  taxApplicable: {
    type: Boolean,
    default: false,
  },
  tax: { type: Number, default: 0 },
  taxType: { type: String },
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
