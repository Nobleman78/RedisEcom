import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDiscount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const Product = mongoose.model("Product", productSchema);
export default Product;
