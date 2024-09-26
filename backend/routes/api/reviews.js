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

const validateReview = [
	check("review")
		.exists({ checkFalsy: true })
		.withMessage("Review text is required"),
	check("stars")
		.exists({ checkFalsy: true })
		.isFloat({ min: 1, max: 5 })
		.withMessage("Stars must be an integer from 1 to 5"),
	handleValidationErrors,
];

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
					include: { model: SpotImage, where: { preview: true } },
					attributes: { exclude: ["description", "createdAt", "updatedAt"] },
				},
				{
					model: ReviewImage,
					attributes: ["id", "url"],
				},
			],
		});
		let Reviews = [];
		if (reviews) {
			reviews.map((review) => {
				Reviews.push({
					id: review.id,
					userId: review.userId,
					spotId: review.spotId,
					review: review.review,
					stars: review.stars,
					createdAt: `${review.createdAt.getFullYear()}-${
						review.createdAt.getMonth() + 1
					}-${review.createdAt.getDate()} ${review.createdAt.getHours()}:${review.createdAt.getMinutes()}:${review.createdAt.getSeconds()}`,
					updatedAt: `${review.updatedAt.getFullYear()}-${
						review.updatedAt.getMonth() + 1
					}-${review.updatedAt.getDate()} ${review.updatedAt.getHours()}:${review.updatedAt.getMinutes()}:${review.updatedAt.getSeconds()}`,
					User: review.User,
					Spot: {
						id: review.Spot.id,
						ownerId: review.Spot.ownerId,
						address: review.Spot.address,
						city: review.Spot.city,
						state: review.Spot.state,
						country: review.Spot.country,
						lat: review.Spot.lat,
						lng: review.Spot.lng,
						name: review.Spot.name,
						price: review.Spot.price,
						previewImage: review.Spot.SpotImages[0].url,
					},
					ReviewImages: review.ReviewImages,
				});
			});
			res.status(200).json({ Reviews });
		} else {
			res.status(404).json({ message: "Couldn't find any reviews" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", async (req, res) => {
	const { user } = req;

	if (user) {
		const { url } = req.body;
		const review = await Review.findByPk(req.params.reviewId);
		if (review) {
			const images = await ReviewImage.findAll({
				where: { reviewId: review.id },
			});
			if (images.length < 10) {
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
					res.status(403).json({ message: "Forbidden" });
				}
			} else {
				res.status(403).json({
					message: "Maximum number of images for this resource was reached",
				});
			}
		} else {
			res.status(404).json({ message: "Review couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Edit a review
router.put("/:reviewId", validateReview, async (req, res) => {
	const { user } = req;
	const { review, stars } = req.body;
	if (user) {
		const reviews = await Review.findByPk(req.params.reviewId);
		if (reviews) {
			if (reviews.userId === user.id) {
				const updatedReview = await reviews.update({
					review,
					stars,
					updatedAt: new Date(),
				});

				const formattedRes = {
					id: updatedReview.id,
					userId: updatedReview.userId,
					spotId: updatedReview.spotId,
					review: updatedReview.review,
					stars: updatedReview.stars,
					createdAt: `${updatedReview.createdAt.getFullYear()}-${
						updatedReview.createdAt.getMonth() + 1
					}-${updatedReview.createdAt.getDate()} ${updatedReview.createdAt.getHours()}:${updatedReview.createdAt.getMinutes()}:${updatedReview.createdAt.getSeconds()}`,
					updatedAt: `${updatedReview.updatedAt.getFullYear()}-${
						updatedReview.updatedAt.getMonth() + 1
					}-${updatedReview.updatedAt.getDate()} ${updatedReview.updatedAt.getHours()}:${updatedReview.updatedAt.getMinutes()}:${updatedReview.updatedAt.getSeconds()}`,
				};
				res.json(formattedRes);
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Review couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

router.delete("/:reviewId", async (req, res) => {
	const { user } = req;
	if (user) {
		const review = await Review.findByPk(req.params.reviewId);
		if (review) {
			if (review.userId === user.id) {
				await review.destroy();
				res.json({ message: "Successfully deleted" });
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Review couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

//Delete a Review
router.delete("/:reviewId", async (req, res) => {
	const { user } = req;

	if (user) {
		const review = await Review.findByPk(req.params.reviewId);
		if (review) {
			if (user.id === review.userId) {
				await review.destroy();
				res.status(200).json({ message: "Successfully deleted" });
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Review couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

module.exports = router;
