const express = require("express");
const { Spot } = require("../../db/models");
const router = express.Router();

router.get("/", async (req, res) => {
	const spots = await Spot.findAll();

	res.json({ spots });
});

router.get("/current", async (req, res) => {
	const { user } = req;

	const spots = await Spot.findAll({ where: { ownerId: user.id } });

	res.json({ spots });
});

router.get("/:spotId", async (req, res) => {
	const { user } = req;
	console.log(req.params);
	const spot = await Spot.findByPk(req.params.spotId);
	if (spot) {
		res.json({
			spot,
			Owner: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
			},
		});
	} else {
		res.json({ message: "Spot couldn't be found" });
	}
});

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
	}
});
module.exports = router;
