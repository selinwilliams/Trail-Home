const express = require("express");
const { Spot, User, SpotImage, Review, Booking } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");
const { Op } = require("sequelize");

//Get all of the Current User's Bookings
router.get("/current", async (req, res) => {
	const { user } = req;
	if (user) {
		const bookings = await Booking.findAll({
			where: { userId: user.id },
			include: [
				{
					model: Spot,
					include: {
						model: SpotImage,
						where: { preview: true },
					},
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
		});
		const Bookings = [];
		const formatRes = bookings.map((value) => {
			Bookings.push({
				id: value.id,
				spotId: value.spotId,
				Spot: {
					id: value.Spot.id,
					ownerId: value.Spot.ownerId,
					address: value.Spot.address,
					city: value.Spot.city,
					state: value.Spot.state,
					country: value.Spot.country,
					lat: value.Spot.lat,
					lng: value.Spot.lng,
					name: value.Spot.name,
					price: value.Spot.price,
					previewImage: value.Spot.SpotImages[0].url,
				},
				userId: value.userId,
				startDate: value.startDate.toJSON().slice(0, 10),
				endDate: value.endDate.toJSON().slice(0, 10),
				createdAt: `${value.createdAt.getFullYear()}-${
					value.createdAt.getMonth() + 1
				}-${value.createdAt.getDate()} ${value.createdAt.getHours()}:${value.createdAt.getMinutes()}:${value.createdAt.getSeconds()}`,
				updatedAt: `${value.updatedAt.getFullYear()}-${
					value.updatedAt.getMonth() + 1
				}-${value.updatedAt.getDate()} ${value.updatedAt.getHours()}:${value.updatedAt.getMinutes()}:${value.updatedAt.getSeconds()}`,
			});
		});
		res.status(200).json({ Bookings });
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Edit a booking
router.put("/:bookingId", async (req, res) => {
	const { user } = req;
	const { startDate, endDate } = req.body;

	if (user) {
		const conflictingBookings = await Booking.findOne({
			where: {
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

		const booking = await Booking.findByPk(req.params.bookingId);

		if (booking) {
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

			if (booking.userId === user.id) {
				const updatedBooking = await booking.update({
					startDate: startDate,
					endDate: endDate,
					updatedAt: new Date(),
				});

				const formatRes = {
					id: updatedBooking.id,
					spotId: updatedBooking.spotId,
					userId: updatedBooking.userId,
					startDate: startDate,
					endDate: endDate,
					createdAt: `${updatedBooking.createdAt.getFullYear()}-${
						updatedBooking.createdAt.getMonth() + 1
					}-${updatedBooking.createdAt.getDate()} ${updatedBooking.createdAt.getHours()}:${updatedBooking.createdAt.getMinutes()}:${updatedBooking.createdAt.getSeconds()}`,
					updatedAt: `${updatedBooking.updatedAt.getFullYear()}-${
						updatedBooking.updatedAt.getMonth() + 1
					}-${updatedBooking.updatedAt.getDate()} ${updatedBooking.updatedAt.getHours()}:${updatedBooking.updatedAt.getMinutes()}:${updatedBooking.updatedAt.getSeconds()}`,
				};
				res.json(formatRes);
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Booking couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});

// Delete a booking
router.delete("/:bookingId", async (req, res) => {
	const { user } = req;
	if (user) {
		const booking = await Booking.findByPk(req.params.bookingId);
		console.log(booking);

		if (booking) {
			if (booking.userId === user.id || spot.ownerId === user.id) {
				const currentDate = new Date();
				if (booking.startDate < currentDate) {
					res.status(403).json({
						message: "Bookings that have been started can't be deleted",
					});
				} else {
					await booking.destroy();
					res.json({ message: "Successfully deleted" });
				}
			} else {
				res.status(403).json({ message: "Forbidden" });
			}
		} else {
			res.status(404).json({ message: "Booking couldn't be found" });
		}
	} else {
		res.status(401).json({ message: "Authentication required" });
	}
});
module.exports = router;
