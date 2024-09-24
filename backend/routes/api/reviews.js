const express = require("express");
const {
	Spot,
	User,
	SpotImage,
	Review,
	ReviewImage,
} = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");

// Get all reviews by Current user
router.get("/current", async (req, res) => {
	const { user } = req;
	if (user) {
		const reviews = await Review.findAll({
			where: { userId: user.id },
			include: [
				{
					model: User,
					attributes: ["id", "firstName", "lastName"],
				},
				{
					model: Spot,
					include: { model: SpotImage },
					attributes: { exclude: ["description", "createdAt", "updatedAt"] },
				},
			],
		});
		// TRYING TO GET PREVIEW IMAGE URL TO SHOW !!!!!
		let Reviews = [];
		reviews.forEach((review) => Reviews.push(review.toJSON()));
		Reviews.forEach((review) => {
			review.Spot.SpotImages.forEach((image) => {
				if (image.preview === true) {
					review.Spot.previewImage = image.url;
					delete review.Spot.SpotImages;
				}
			});

			review.Spot.previewImage = "no preview url";
		});

		res.json({ reviews });
	}
});

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", async (req, res) => {
	const { user } = req;

	if (user) {
		const { url } = req.body;
		const review = await Review.findByPk(req.params.reviewId);
		if (review) {
			if (review.userId === user.id) {
				const newImage = await ReviewImage.create({
					reviewId: review.id,
					url,
				});

				res.status(201).json({
					id: newImage.id,
					url: newImage.url,
				});
			} else {
				res.status(404).json({ message: "Review couldn't be found" });
			}
		} else {
			res.status(403).json({
				message: "Maximum number of images for this resource was reached",
			});
		}
	}
});

module.exports = router;
