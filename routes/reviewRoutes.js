const express = require("express");
const { createReview, getReviews, updateReview, deleteReview } = require("../controllers/reviewController");  

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.patch("/:id", updateReview);  
router.delete("/:id", deleteReview);

module.exports = router;
