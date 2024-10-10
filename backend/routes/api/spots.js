const express = require("express");
const {
	Spot,
	User,
	SpotImage,
	Review,
	ReviewImage,
	Sequelize,
	Booking,
} = require("../../db/models");
const router = express.Router();
const { Op } = require("sequelize");
const { check } = require("express-validator");
const { query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");

const validateCreation = [
	check("address")
		.exists({ checkFalsy: true })
		.withMessage("Street address is required"),
	check("city").exists({ checkFalsy: true }).withMessage("City is required"),
	check("state").exists({ checkFalsy: true }).withMessage("State is required"),
	check("country")
		.exists({ checkFalsy: true })
		.withMessage("Country is required"),
	check("lat")
		.exists({ checkFalsy: true })
		.isDecimal()
		.isFloat({ min: -90, max: 90 })
		.withMessage("Latitude must be within -90 and 90"),
	check("lng")
		.exists({ checkFalsy: true })
		.isDecimal()
		.isFloat({ min: -180, max: 180 })
		.withMessage("Longitude must be within -180 and 180"),
	check("name")
		.exists({ checkFalsy: true })
		.isLength({ max: 50 })
		.withMessage("Name must be less than 50 characters"),
	check("description")
		.exists({ checkFalsy: true })
		.withMessage("Description is required"),
	check("price")
		.exists({ checkFalsy: true })
		.isInt()
		.custom((value) => (value >= 0 ? true : false))
		.withMessage("Price per day must be a positive number"),
	handleValidationErrors,
];

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

const validateSpotQueries = [
	query("page")
		.optional()
		.isFloat({ min: 1 })
		// .default({ default_value: 1 })
		.withMessage("Page must be greated than or equal to 1"),
	query("size")
		.optional()
		.isFloat({ min: 1, max: 20 })
		// .default({ default_value: 20 })
		.withMessage("Size must be between 1 and 20"),
	query("maxLat")
		.optional()
		.isFloat({ max: 90 })
		.withMessage("Maximum latitude is invalid"),
	query("minLat")
		.optional()
		.isFloat({ min: -90 })
		.withMessage("Minimum latitude is invalid"),
	query("minLng")
		.optional()
		.isFloat({ min: -180 })
		.withMessage("Minimum longitude is invalid"),
	query("maxLng")
		.optional()
		.isDecimal()
		.isFloat({ max: 180 })
		.withMessage("Maxium longitude is invalid"),
	query("minPrice")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Minimum price must be greater than or equal to 0"),
	query("maxPrice")
		.optional()
		.isFloat({ min: 0 })
		.withMessage("Maximum price must be greater than or equal to 0"),
	handleValidationErrors,
];

// Get all Spots
router.get("/", validateSpotQueries, async (req, res) => {
	let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
		req.query;

	let query = {
		where: {},
		include: [{ model: SpotImage }, { model: Review }],
	};

	if (page === undefined) {
		page = 1;
	} else {
		page = parseInt(page);
	}

	if (size === undefined) {
		size = 20;
	} else {
		size = parseInt(size);
	}

	if (page >= 1 && size >= 1) {
		query.limit = size;
		query.offset = size * (page - 1);
	}

	if (minLat) query.where.lat = { [Op.gte]: minLat };
	if (maxLat) query.where.lat = { [Op.lte]: maxLat };
	if (maxLng) query.where.lng = { [Op.lte]: maxLng };
	if (minLng) query.where.lng = { [Op.gte]: minLng };
	if (minPrice) query.where.price = { [Op.gte]: minPrice };
	if (maxPrice) query.where.price = { [Op.lte]: maxPrice };

	const spots = await Spot.findAll(query);

	let Spots = [];

	spots.map((spot) => {
		let count = 0;
		let previewUrl = "no preview url";
		spot.Reviews.forEach((review) => (count += review.stars));
		spot.SpotImages.forEach((image) =>
			image.preview === true
				? (previewUrl = image.url)
				: (previewUrl = "no preview url")
		);
		Spots.push({
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: Number(spot.lat),
			lng: Number(spot.lng),
			name: spot.name,
			description: spot.description,
			price: Number(spot.price),
			createdAt: `${spot.createdAt.getFullYear()}-${
				spot.createdAt.getMonth() + 1
			}-${spot.createdAt.getDate()} ${spot.createdAt.getHours()}:${spot.createdAt.getMinutes()}:${spot.createdAt.getSeconds()}`,
			updatedAt: `${spot.updatedAt.getFullYear()}-${
				spot.updatedAt.getMonth() + 1
			}-${spot.updatedAt.getDate()} ${spot.updatedAt.getHours()}:${spot.updatedAt.getMinutes()}:${spot.updatedAt.getSeconds()}`,
			// Need to come back and fix this
			avgRating: count / spot.Reviews.length || 0,
			previewImage: previewUrl,
		});
	});

	res.json({ Spots, page: page, size: size });
});
// Get all Spots owned by the Current User
router.get("/current", async (req, res) => {
	const { user } = req;

	if (user) {
		const spots = await Spot.findAll({
			where: { ownerId: user.id },
			include: [{ model: SpotImage }, { model: Review }],
		});

		let Spots = [];
		spots.map((spot) => {
			let count = 0;
			let previewUrl = "no preview url";
			spot.Reviews.forEach((review) => (count += review.stars));
			spot.SpotImages.forEach((image) =>
				image.preview === true
					? (previewUrl = image.url)
					: (previewUrl = "no preview url")
			);
			Spots.push({
				id: spot.id,
				ownerId: spot.ownerId,
				address: spot.address,
				city: spot.city,
				state: spot.state,
				country: spot.country,
				lat: spot.lat,
				lng: spot.lng,
				name: spot.name,
				description: spot.description,
				price: spot.price,
				createdAt: `${spot.createdAt.getFullYear()}-${
					spot.createdAt.getMonth() + 1
				}-${spot.createdAt.getDate()} ${spot.createdAt.getHours()}:${spot.createdAt.getMinutes()}:${spot.createdAt.getSeconds()}`,
				updatedAt: `${spot.updatedAt.getFullYear()}-${
					spot.updatedAt.getMonth() + 1
				}-${spot.updatedAt.getDate()} ${spot.updatedAt.getHours()}:${spot.updatedAt.getMinutes()}:${spot.updatedAt.getSeconds()}`,
				// Need to come back and fix this
				avgRating: count / spot.Reviews.length || 0,
				previewImage: previewUrl,
			});
		});

		res.json({ Spots });
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});
// Get details of a spot by SpotId
router.get("/:spotId", async (req, res) => {
	let stars = 0;
	const spot = await Spot.findByPk(req.params.spotId, {
		include: [
			{ model: Review, attributes: [] },
			{ model: SpotImage, attributes: ["id", "url", "preview"] },
			{ model: User, as: "Owner" },
		],
	});
	if (spot) {
		const reviews = await Review.findAll({ where: { spotId: spot.id } });
		if (reviews.length > 1) {
			stars = reviews.reduce((a, b) => a.stars + b.stars);
		}

		const formatSpot = {
			id: spot.id,
			ownerId: spot.ownerId,
			address: spot.address,
			city: spot.city,
			state: spot.state,
			country: spot.country,
			lat: spot.lat,
			lng: spot.lng,
			name: spot.name,
			description: spot.description,
			price: spot.price,
			createdAt: `${spot.createdAt.getFullYear()}-${
				spot.createdAt.getMonth() + 1
			}-${spot.createdAt.getDate()} ${spot.createdAt.getHours()}:${spot.createdAt.getMinutes()}:${spot.createdAt.getSeconds()}`,
			updatedAt: `${spot.updatedAt.getFullYear()}-${
				spot.updatedAt.getMonth() + 1
			}-${spot.updatedAt.getDate()} ${spot.updatedAt.getHours()}:${spot.updatedAt.getMinutes()}:${spot.updatedAt.getSeconds()}`,
			numReviews: reviews.length,
			avgStarRating: stars / reviews.length,
			SpotImages: spot.SpotImages,
			Owner: {
				id: spot.Owner.id,
				firstName: spot.Owner.firstName,
				lastName: spot.Owner.lastName,
			},
		};

		res.json(formatSpot);
	} else {
		res.status(404).json({ message: "Spot couldn't be found" });
	}
});
// Create a Spot
router.post("/", validateCreation, async (req, res) => {
	const { user } = req;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	if (user) {
		const newSpot = await Spot.create({
			ownerId: user.id,
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});
		res.status(201).json(newSpot);
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Add an Image to a spot based on the spot's ID
router.post("/:spotId/images", async (req, res) => {
	const { user } = req;
	if (user) {
		const { url, preview } = req.body;
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (spot.ownerId === user.id) {
				const newImage = await SpotImage.create({
					spotId: spot.id,
					url,
					preview,
				});
				res.status(201).json({
					id: newImage.id,
					url: newImage.url,
					preview: newImage.preview,
				});
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Edit a spot
router.put("/:spotId", validateCreation, async (req, res) => {
	const { user } = req;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;
	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (spot.ownerId === user.id) {
				const updatedSpot = await spot.update({
					address: address,
					city: city,
					state: state,
					country: country,
					lat: lat,
					lng: lng,
					name: name,
					description: description,
					price: price,
					updatedAt: new DATE(),
				});
				const formattedRes = {
					id: updatedSpot.id,
					ownerId: updatedSpot.ownerId,
					address: updatedSpot.address,
					city: updatedSpot.city,
					state: updatedSpot.state,
					country: updatedSpot.country,
					lat: updatedSpot.lat,
					lng: updatedSpot.lng,
					name: updatedSpot.name,
					description: updatedSpot.description,
					price: updatedSpot.price,
					createdAt: `${updatedSpot.createdAt.getFullYear()}-${
						updatedSpot.createdAt.getMonth() + 1
					}-${updatedSpot.createdAt.getDate()} ${updatedSpot.createdAt.getHours()}:${updatedSpot.createdAt.getMinutes()}:${updatedSpot.createdAt.getSeconds()}`,
					updatedAt: `${updatedSpot.updatedAt.getFullYear()}-${
						updatedSpot.updatedAt.getMonth() + 1
					}-${updatedSpot.updatedAt.getDate()} ${updatedSpot.updatedAt.getHours()}:${updatedSpot.updatedAt.getMinutes()}:${updatedSpot.updatedAt.getSeconds()}`,
				};
				res.json(formattedRes);
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Delete a spot
router.delete("/:spotId", async (req, res) => {
	const { user } = req;
	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (user.id === spot.ownerId) {
				await spot.destroy();
				res.status(200).json({ message: "Successfully deleted" });
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Create a review for a spot based on the spot's id
router.post("/:spotId/reviews", validateReview, async (req, res) => {
	const { user } = req;
	const { review, stars } = req.body;

	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			const reviews = await Review.findOne({
				where: { spotId: spot.id, userId: user.id },
			});
			if (reviews) {
				res
					.status(500)
					.json({ message: "User already has a review for this spot" });
			} else {
				const newReview = await Review.create({
					userId: user.id,
					spotId: spot.id,
					review,
					stars,
				});
				const formattedRes = {
					id: newReview.id,
					userId: newReview.userId,
					spotId: newReview.spotId,
					review: newReview.review,
					stars: newReview.stars,
					createdAt: `${newReview.createdAt.getFullYear()}-${
						newReview.createdAt.getMonth() + 1
					}-${newReview.createdAt.getDate()} ${newReview.createdAt.getHours()}:${newReview.createdAt.getMinutes()}:${newReview.createdAt.getSeconds()}`,
					updatedAt: `${newReview.updatedAt.getFullYear()}-${
						newReview.updatedAt.getMonth() + 1
					}-${newReview.updatedAt.getDate()} ${newReview.updatedAt.getHours()}:${newReview.updatedAt.getMinutes()}:${newReview.updatedAt.getSeconds()}`,
				};

				res.status(201).json(formattedRes);
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Get all Reviews by a spot's Id
router.get("/:spotId/reviews", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	const reviews = await Review.findAll({
		where: { spotId: req.params.spotId },
		include: [
			{ model: User, attributes: ["id", "firstName", "lastName"] },
			{ model: ReviewImage, attributes: ["id", "url"] },
		],
	});
	if (spot) {
		const Reviews = [];
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
				ReviewImages: review.ReviewImages,
			});
		});
		res.json({ Reviews });
	} else {
		res.status(404).json({ message: "Spot couldn't be found" });
	}
});

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", async (req, res) => {
	const { user } = req;

	if (user) {
		const spot = await Spot.findByPk(req.params.spotId);
		if (spot) {
			if (spot.ownerId === user.id) {
				const booking = await Booking.findAll({
					where: { spotId: spot.id },
					include: { model: User, attributes: ["id", "firstName", "lastName"] },
				});

				const Bookings = booking.map((value) => {
					const startDate = value.startDate;
					const endDate = value.endDate;
					return {
						User: {
							id: value.User.id,
							firstName: value.User.firstName,
							lastName: value.User.lastName,
						},
						id: value.id,
						spotId: spot.id,
						userId: value.userId,
						startDate: `${startDate.getFullYear()}-${
							startDate.getMonth() + 1
						}-${startDate.getDate()}`,
						endDate: `${endDate.getFullYear()}-${
							endDate.getMonth() + 1
						}-${endDate.getDate()}`,
						createdAt: `${value.createdAt.getFullYear()}-${
							value.createdAt.getMonth() + 1
						}-${value.createdAt.getDate()} ${value.createdAt.getHours()}:${value.createdAt.getMinutes()}:${value.createdAt.getSeconds()}`,
						updatedAt: `${value.updatedAt.getFullYear()}-${
							value.updatedAt.getMonth() + 1
						}-${value.updatedAt.getDate()} ${value.updatedAt.getHours()}:${value.updatedAt.getMinutes()}:${value.updatedAt.getSeconds()}`,
					};
				});
				res.json({ Bookings });
			} else {
				const booking = await Booking.findAll({
					where: { spotId: spot.id },
					attributes: ["spotId", "startDate", "endDate"],
				});
				const Bookings = booking.map((value) => {
					const startDate = value.startDate;
					const endDate = value.endDate;

					return {
						spotId: spot.id,
						startDate: `${startDate.getFullYear()}-${
							startDate.getMonth() + 1
						}-${startDate.getDate()}`,
						endDate: `${endDate.getFullYear()}-${
							endDate.getMonth() + 1
						}-${endDate.getDate()}`,
					};
				});
				res.json({ Bookings });
			}
		} else {
			res.status(404).json({ message: "Spot couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", async (req, res) => {
	const { user } = req;
	const { startDate, endDate } = req.body;
	const spot = await Spot.findByPk(req.params.spotId);

	if (!spot) {
		return res.status(404).json({ message: "Spot couldn't be found" });
	}

	// Check if the spot belongs to the current user
	if (spot.ownerId === user.id) {
		return res.status(403).json({
			message: "You cannot book your own spot",
		});
	}

	// Check for date conflicts with existing bookings for this spot
	const conflictingBookings = await Booking.findOne({
		where: {
			spotId: spot.id,
			[Op.or]: [
				{
					startDate: { [Op.lte]: endDate },
					endDate: { [Op.gte]: startDate },
				},
			],
		},
	});

	if (conflictingBookings) {
		return res.status(403).json({
			message: "Sorry, this spot is already booked for the specified dates",
			errors: {
				startDate: "Start date conflicts with an existing booking",
				endDate: "End date conflicts with an existing booking",
			},
		});
	}

	const currentDate = new Date();
	if (new Date(startDate) < currentDate) {
		return res.status(400).json({
			message: "Bad Request",
			errors: {
				startDate: "startDate cannot be in the past",
			},
		});
	}

	if (new Date(endDate) <= new Date(startDate)) {
		return res.status(400).json({
			message: "Bad Request",
			errors: {
				endDate: "endDate cannot be on or before startDate",
			},
		});
	}

	const newBooking = await Booking.create({
		spotId: spot.id,
		userId: user.id,
		startDate,
		endDate,
	});
	const formatRes = {
		id: newBooking.id,
		spotId: newBooking.spotId,
		userId: newBooking.userId,
		startDate: startDate,
		endDate: endDate,
		createdAt: `${newBooking.createdAt.getFullYear()}-${
			newBooking.createdAt.getMonth() + 1
		}-${newBooking.createdAt.getDate()} ${newBooking.createdAt.getHours()}:${newBooking.createdAt.getMinutes()}:${newBooking.createdAt.getSeconds()}`,
		updatedAt: `${newBooking.updatedAt.getFullYear()}-${
			newBooking.updatedAt.getMonth() + 1
		}-${newBooking.updatedAt.getDate()} ${newBooking.updatedAt.getHours()}:${newBooking.updatedAt.getMinutes()}:${newBooking.updatedAt.getSeconds()}`,
	};
	res.status(201).json(formatRes);
});

module.exports = router;
