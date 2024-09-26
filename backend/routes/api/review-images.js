const express = require("express");
const {
	Spot,
	User,
	SpotImage,
	Review,
	Booking,
	ReviewImage,
} = require("../../db/models");
const router = express.Router();

//Delete a Spot Image
router.delete("/:imageId", async (req, res) => {
	const { user } = req;
	const { imageId } = req.params;

	if (user) {
		const reviewImage = await ReviewImage.findByPk(imageId);
		if (reviewImage) {
			const review = await Review.findByPk(reviewImage.reviewId);
			if (user.id === review.userId) {
				await reviewImage.destroy();
				res.status(200).json({ message: "Successfully deleted" });
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Review Image couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

module.exports = router;
