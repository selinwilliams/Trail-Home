const express = require("express");
const { Spot, User } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

//Get all Spots
router.get("/", async (req, res) => {
	const spots = await Spot.findAll();

	res.json({ spots });
});
// Get all Spots owned by the Current User
router.get("/current", async (req, res) => {
	const { user } = req;
	if (user) {
		const spots = await Spot.findAll({ where: { ownerId: user.id } });

		res.json({ spots });
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});
// Get spot by SpotId
router.get("/:spotId", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	const owner = await User.findByPk(spot.ownerId);
	if (spot) {
		res.json({
			spot,
			Owner: {
				id: owner.id,
				firstName: owner.firstName,
				lastName: owner.lastName,
			},
		});
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
		res.json({ newSpot });
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

router.delete("/:spotId", async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	await spot.destroy();
	res.status(200).json({ message: "Successfully deleted" });
});
module.exports = router;
