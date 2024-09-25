const express = require("express");
const { Spot, User, SpotImage, Review, Booking } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DATE, Model, where } = require("sequelize");
const spotimage = require("../../db/models/spotimage");
const spot = require("../../db/models/spot");

//Get all of the Current User's Bookings
router.get("/current", async (req, res) => {
  const { user } = req;
  if (user) {
    const bookings = await Booking.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Spot,
          include: { model: SpotImage },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    let Bookings = [];
    bookings.forEach((booking) => Bookings.push(booking.toJSON()));
    Bookings.forEach((review) => {
      review.Spot.SpotImages.forEach((image) => {
        if (image.preview === true) {
          review.Spot.previewImage = image.url;
          delete review.Spot.SpotImages;
        }
      });
    });
    res.status(200).json({ Bookings });
  }
});


//Edit a booking
router.put("/:bookingId", async (req, res) => {
    const { user } = req;
    const { startDate, endDate } = req.body;

    if (user) {
        const booking = await Booking.findByPk(req.params.bookingId);
        if (booking.endDate < new Date()) {
            res.status(403).json({ message: "Past bookings can't be modified" });
        }
        if (booking) {
            if (booking.id === user.id) {
                const updatedBooking = await booking.update({
                    startDate: startDate,
                    endDate: endDate,
                    updatedAt: new Date(),
                })
                res.json(updatedBooking);
            } else {
                res.status(403).json({message: "Forbidden"});
            }
        } else {
            res.status(404).json({message: "Booking couldn't be found"});
        }
    }
});

module.exports = router;
