const Review = require("../models/Review");

const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();  
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createReview, getReviews };
