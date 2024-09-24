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
  const user = req;
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
      review.Spot.SpotImage.forEach((image) => {
        if (image.preview === true) {
          review.Spot.previewImage = image.url;
        //   delete review.Spot.SpotImage;
        }
      });
      review.Spot.previewImage = "no preview";
    });
    res.status(200).json({ Bookings });
  }
});


module.exports = router;