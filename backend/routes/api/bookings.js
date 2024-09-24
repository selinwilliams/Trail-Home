const express = require("express");
const { Spot, User, SpotImage, Review } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");

//Get All Bookings
router.get("/current", async (req, res) => {
    const user = req;
    if (user) {
        const bookings = await Booking.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: Spot,
                    include: { model: SpotImage },
                    attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"],
                },
            ]
        });

        let Bookings = [];
        bookings.forEach((booking) => Bookings.push(booking.toJSON()));
        Bookings.forEach((review) => {
            booking.Spot.SpotImage.forEach((image) => {
                if (image.preview === true) {
                    booking.Spot.previewImage = image.url;
                    delete booking.Spot.SpotImage;
                }
            });
            booking.Spot.previewImage = "no preview";
        })
        res.status(200).json({ bookings });
    }
});
