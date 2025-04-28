// controllers/review.js
import Review from "../models/review.js";

export async function addReview(req, res) {
    try {
        const { user_id } = req.user; 
        const book_id = req.params.id; 
        const { review_text } = req.body; 
        const foundReview = await Review.findOne({ user_id, book_id });

        if (foundReview) {
            foundReview.review_text = review_text;
            await foundReview.save();
            return res.json({ message: "Review updated successfully!" });
        }

        const newReview = new Review({
            user_id,
            book_id,
            review_text,
        });
        await newReview.save();
        res.json({ message: "Review added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function getReview(req, res) {
    try {
        const { id } = req.params; 
        const bookReviews = await Review.find({ book_id: id });
        if (bookReviews.length === 0) {
            return res.json({ message: "No review found for this book!" });
        }

        res.json({ message: "Reviews found for this book", bookReviews });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function deleteReview(req, res) {
    try {
        const { user_id } = req.user; 
        const { id } = req.params;
        const deletedReview = await Review.deleteOne({ user_id, book_id: id });
        if (deletedReview.deletedCount === 0) {
            return res.json({ message: "No review found for that user to delete!" });
        }
        res.json({ message: "Review deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
