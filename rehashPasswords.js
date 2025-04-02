const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config(); // Load environment variables

// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    const users = await User.find();
    for (let user of users) {
      if (!user.password.startsWith("$2a$")) { // Check if password is NOT hashed
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await User.updateOne({ _id: user._id }, { password: hashedPassword });
        console.log(`🔹 Updated password for ${user.email}`);
      }
    }

    console.log("✅ Password rehashing completed");
    mongoose.connection.close(); // Close DB connection
  })
  .catch(err => {
    console.error("❌ Database Connection Error:", err);
  });
