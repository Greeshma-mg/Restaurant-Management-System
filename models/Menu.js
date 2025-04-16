const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
      minlength: [2, "Menu item name must be at least 2 characters long"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a non-negative number"], 
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      lowercase: true,
      minlength: [2, "Category must be at least 2 characters long"],
      index: true, 
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: function () {
        return process.env.BASE_URL
          ? `${process.env.BASE_URL}/images/biryani.jpg`
          : "/images/biryani.jpg";
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    totalUsers: {
      type: Number,
      default: 0,
      min: [0, "Total users must be a non-negative number"],
    },
  },
  { timestamps: true }
);


menuSchema.virtual("availability").get(function () {
  return this.isAvailable ?? true;
});

menuSchema.set("toJSON", { virtuals: true });
menuSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("MenuItem", menuSchema); 
