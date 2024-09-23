const express = require("express");
const { Spot, User, SpotImage } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");

// const validateCreation = [
// 	check("address")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Street address is required"),
// 	check("city").exists({ checkFalsy: true }).withMessage("City is required"),
// 	check("state").exists({ checkFalsy: true }).withMessage("State is required"),
// 	check("country")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Country is required"),
// 	check("lat")
// 		.exists({ checkFalsy: true })
// 		// .isLatLong({ checkDMS: true })
// 		.withMessage("Latitude must be within -90 and 90"),
// 	check("lng")
// 		.exists({ checkFalsy: true })
// 		// .isLatLong({ checkDMS: true })
// 		.withMessage("Longitude must be within -180 and 180"),
// 	check("name")
// 		.exists({ checkFalsy: true })
// 		.isLength({ max: 50 })
// 		.withMessage("Name must be less than 50 characters"),
// 	check("description")
// 		.exists({ checkFalsy: true })
// 		.withMessage("Description is required"),
// 	check("price")
// 		.exists({ checkFalsy: true })
// 		.isDecimal({ blacklisted_chars: "-" })
// 		.withMessage("Price per day must be a positive number"),
// 	handleValidationErrors,
// ];

// Get all Spots
router.get("/", async (req, res) => {
	const spots = await Spot.findAll({
		include: { model: SpotImage },
	});
	let Spots = [];
	spots.forEach((spot) => {
		Spots.push(spot.toJSON());
	});

	Spots.forEach((spot) => {
		spot.SpotImages.forEach((image) => {
			spot.previewImage = image.url;
			delete spot.SpotImages;
		});
	});
	res.json({ Spots });
});
// Get all Spots owned by the Current User
router.get("/current", async (req, res) => {
	const { user } = req;

	if (user) {
		const spots = await Spot.findAll({
			where: { ownerId: user.id },
			include: { model: SpotImage, where: { preview: true } },
		});
		let Spots = [];
		spots.forEach((spot) => {
			Spots.push(spot.toJSON());
		});

		Spots.forEach((spot) => {
			spot.SpotImages.forEach((image) => {
				spot.previewImage = image.url;
				delete spot.SpotImages;
			});
		});
		res.json({ Spots });
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});
// Get spot by SpotId
router.get("/:spotId", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId, {
		include: [
			{ model: SpotImage },
			{ model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
		],
	});
	if (spot) {
		res.json(spot);
	} else {
		res.json({ message: "Spot couldn't be found" });
	}
});
// Create a Spot
router.post("/", async (req, res) => {
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
		res.status(201).json({ newSpot });
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
router.put("/:spotId", async (req, res) => {
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
				res.json(updatedSpot);
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
module.exports = router;
