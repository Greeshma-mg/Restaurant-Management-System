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

// Update a review
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };  