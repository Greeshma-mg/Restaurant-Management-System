const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["admin", "manager", "chef", "waiter", "cashier", "customer", "supplier"], 
      default: "customer" 
    },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed successfully"); 
    next();
  } catch (error) {
    console.error(" Error hashing password:", error);
    next(error);
  }
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);
