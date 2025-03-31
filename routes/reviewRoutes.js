const express = require("express");
const { createReview, getReviews, updateReview, deleteReview } = require("../controllers/reviewController");  // ✅ Import properly

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.patch("/:id", updateReview);  // ✅ Update a review
router.delete("/:id", deleteReview); // ✅ Delete a review

module.exports = router;
