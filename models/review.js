import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", 
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book",
    },
    review_text: {
        type: String,
        required: true,
    },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
